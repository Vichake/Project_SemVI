import React from 'react';
import Header from '../../components/Header'
import Main from '../../components/LearnNew/Main';
import TrendingTechnologies from '../../components/LearnNew/Technology';
// import Categories from '../../components/LearnNew/Categories';
import Techniques from '../../components/LearnNew/Techniques';
import Quote from '../../components/LearnNew/Quote';
import Reviews from '../../components/LearnNew/Reviews';
import { useUser } from '../../context/userContext.jsx';
import './css/Technique.css'

function LearnFarmingTechniques() {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const {userData} = useUser();
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Scroll to techniques section
    document.getElementById('techniques').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header userData={userData}/>
    <div className="app-container">
      <Main />
      <TrendingTechnologies />
      {/* <Categories onCategorySelect={handleCategorySelect} /> */}
      <Techniques 
        selectedCategory={selectedCategory} 
        id="techniques" 
        className={`techniques ${!selectedCategory ? 'hidden' : ''}`} 
        />
      {/* <Quote /> */}
      <Reviews />
    </div>
    </>
  );
}

export default LearnFarmingTechniques;