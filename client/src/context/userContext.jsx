import React, { createContext, useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import {API_URL} from './config'

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          const response = await Axios.get(`${API_URL}/api/getUser`, {
            params: { userId: parsedUser }
          });
          // console.log(response.data);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No user data found in local storage.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
