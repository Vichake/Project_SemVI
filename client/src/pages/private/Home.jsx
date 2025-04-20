import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Header from '../../components/Header';
import WelcomeUser from '../../components/Welcome.jsx';
import PersonalProfile from '../../components/Profile.jsx'; // Add if you're rendering it here

const Home = () => {
  const url = 'http://localhost:5000/api';
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          const response = await Axios.get(`${url}/getUser`, {
            params: {
              userId: parsedUser
            }
          });
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header userData={userData}/>
      <WelcomeUser username={userData?.name} userData={userData} />
      {/* If you want to show profile directly here */}
      {/* <PersonalProfile userData={userData} /> */}
    </>
  );
};

export default Home;
