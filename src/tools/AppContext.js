import React, { createContext, useContext, useState } from 'react';

// Create context
const AppContext = createContext();

// Custom Hook
function useAppContext() {
  return useContext(AppContext);
}

const AppContextProvider = ({ children }) => {
  // Values given to the Context
  const [context, setContext] = useState({
    loading: false,
    conversation: []
  });

  const setContextOf = (target, value) => {
    setContext( prevContext => ({
      ...prevContext,
      [target]:value
    }))
  }

  return <AppContext.Provider value={[context, setContext, setContextOf]}>{children}</AppContext.Provider>;
};

export { useAppContext, AppContextProvider }