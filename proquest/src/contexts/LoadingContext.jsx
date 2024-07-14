import React, { createContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => React.useContext(LoadingContext);
