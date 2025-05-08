import React, { useState, useEffect } from 'react';
// import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        // const response = await fetch('api/reviews');
        // const data = await response.json();
        
        // Simulating API response for demo
        setTimeout(() => {
          const data = [
            {
              id: 1,
              name: 'Dr. John Smith',
              title: 'Agricultural Scientist',
              comment: 'Precision agriculture is revolutionizing farming by leveraging data and technology.',
              imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww'
            },
            {
              id: 2,
              name: 'Jane Doe',
              title: 'Tech Innovator',
              comment: 'Vertical farming is the future of sustainable food production.',
              imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww'
            },
            {
              id: 3,
              name: 'Prof. Emily White',
              title: 'Environmentalist',
              comment: 'Hydroponics is a game-changer for urban farming.',
              imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww'
            },
            {
              id: 4,
              name: 'Rahul Verma',
              title: 'Farmer',
              comment: 'Drone technology has made monitoring crops and livestock more efficient than ever.',
              imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww'
            },
            {
              id: 5,
              name: 'Dr. Priya Sharma',
              title: 'Agroforestry Expert',
              comment: 'Agroforestry is a sustainable way to integrate trees and crops for long-term benefits.',
              imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww'
            }
          ];
          
          setReviews(data);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to fetch expert reviews');
        setLoading(false);
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="reviews-loading">Loading expert reviews...</div>;
  if (error) return <div className="reviews-error">{error}</div>;

  return (
    <section className="reviews-section">
      <h2>What Experts Say</h2>
      <div className="review-grid">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <img src={review.imageUrl} alt={review.name} />
            <p className="review-comment">"{review.comment}"</p>
            <p className="review-author">- {review.name}, {review.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;