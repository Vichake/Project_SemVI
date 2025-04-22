import React from 'react';
import Header from '../../components/Header';
import WelcomeUser from '../../components/Welcome.jsx';
// import PersonalProfile from '../../components/Profile.jsx';
import { useUser } from '../../context/userContext.jsx';

const Home = () => {
  const { userData, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header userData={userData} />
      <WelcomeUser username={userData?.name} userData={userData} />
      {/* <PersonalProfile userData={userData} /> */}
    </>
  );
};

export default Home;
