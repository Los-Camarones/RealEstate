/**
 * Checks if user is logged in based on their cookie state.
 */

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isUserAuthenticated: boolean;
  checkAuthStatus: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUserAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('userStateToken='));
    if(cookie) {
      const value = cookie.split('=')[1];
      if (value) {
        console.log("User logged in authcontext and returning true");
        setIsAuthenticated(true)
      }
    } else{
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isUserAuthenticated, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
