'use client';

import { createContext, useEffect, useState } from 'react';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext({
  isUserLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
  currentUserEmail: '',
  setCurrentUserEmail: (email: string) => {},
});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsUserLoggedIn(true);
      // Optionally fetch user data here if required using the token
    }
  }, []);

  const loginUser = () => {
    setIsUserLoggedIn(true);
  };

  const logoutUser = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem('jwt_token');
  };

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        loginUser,
        logoutUser,
        currentUserEmail,
        setCurrentUserEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
