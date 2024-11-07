"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  checkAuthStatus: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('userStateToken='));
    console.log('checking cookie' ,cookie);
    if(cookie) {
      const value = cookie.split('=')[1];
      console.log('value' , value);
      if (value) {
        console.log("auth user cookie found and returning true");
        setIsAuthenticated(true)
      }
    } else{
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    //   checkAuthStatus();
    // }, 1000); // Polling every second; adjust as needed
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
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
