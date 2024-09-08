// context/UserContext.js
'use client'

import { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const setUserAndToken = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  return (
    <UserContext.Provider value={{ user, token, setUserAndToken }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
