import React, { useState, useEffect } from 'react';
// import './TrendingTechnologies.css';

const TrendingTechnologies = () => {
  const [trendingTechnologies, setTrendingTechnologies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending technologies from API
  useEffect(() => {
    const fetchTrendingTechnologies = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        // const response = await fetch('api/trending-technologies');
        // const data = await response.json();
        
        // Simulating API response for demo
        const data = [
          {
            id: 1,
            title: 'Precision Agriculture',
            imageUrl: 'https://agfundernews.com/wp-content/uploads/2019/05/iStock-898449496-e1595484927319.jpg',
            description: 'Using technology to optimize farming practices'
          },
          {
            id: 2,
            title: 'Vertical Farming',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtaQL68540in5aL4zESEfeGsppAtPMkqNwBj58yUOst8GKVU8&s',
            description: 'Growing crops in vertically stacked layers'
          },
          {
            id: 3,
            title: 'Hydroponics',
            imageUrl: 'https://risehydroponics.in/wp-content/uploads/2021/04/rise-hydroponics.jpg',
            description: 'Growing plants without soil using mineral nutrient solutions'
          },
          {
            id: 4,
            title: 'Drone Technology',
            imageUrl: 'https://tolluncrewedsystems.com/nitropack_static/bHjpyfPNpTfmHUjWMOXqDCFNBjerTtDg/assets/images/optimized/rev-6556efc/tolluncrewedsystems.com/wp-content/uploads/2021/03/Agriculture.png',
            description: 'Using drones for crop monitoring and analysis'
          }
        ];
        
        setTrendingTechnologies(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trending technologies');
        setLoading(false);
        console.error('Error fetching trending technologies:', err);
      }
    };

    fetchTrendingTechnologies();
  }, []);

  // Automatic slider
  useEffect(() => {
    if (trendingTechnologies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % trendingTechnologies.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [trendingTechnologies.length]);

  if (loading) return <div className="trending-loading">Loading trending technologies...</div>;
  if (error) return <div className="trending-error">{error}</div>;

  return (
    <section className="trending-section">
      <h2>Trending Technologies</h2>
      <div className="trending-slider">
        <div className="trending-slides">
          {trendingTechnologies.map((tech, index) => (
            <div 
              key={tech.id}
              className={`trending-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={tech.imageUrl} alt={tech.title} />
              <p>{tech.title}</p>
            </div>
          ))}
        </div>
        <div className="slider-navigation">
          {trendingTechnologies.map((_, index) => (
            <button 
              key={index} 
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTechnologies;