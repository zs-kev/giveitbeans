'use client';

import { createContext, useEffect, useState } from 'react';

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext({
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

      // Fetch user data using the token
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            'https://giveitbeans.cloudaccess.host/wp-json/wp/v2/users/me',
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();

          setCurrentUserEmail(data.email);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
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
