import React from 'react';
import Header from '../../components/Header';
import WelcomeUser from '../../components/Welcome.jsx';
// import PersonalProfile from '../../components/Profile.jsx';
import { useUser } from '../../context/userContext.jsx';
import HeroSection from '../public/components/Hero.jsx';
import FeatureCards from '../public/components/featureCard';
import AboutUs from '../public/components/about';
import TeamSection from '../public/components/team';
// import FollowUs from './components/Follow';
import Footer from '../public/components/Footer';


const Home = () => {
  const { userData, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header userData={userData} />
      <HeroSection language='en'/>
      <WelcomeUser username={userData?.name} userData={userData} />
      <FeatureCards language='en'/>
      <AboutUs language='en'/>
      <TeamSection language='en'/>
      <Footer/>
      {/* <PersonalProfile userData={userData} /> */}
    </>
  );
};

export default Home;
