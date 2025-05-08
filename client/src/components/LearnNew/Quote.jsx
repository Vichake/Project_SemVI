import React, { useState, useEffect } from 'react';
// import './Quote.css';

const Quote = () => {
  const [quote, setQuote] = useState({
    text: '',
    author: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        // const response = await fetch('api/quote');
        // const data = await response.json();
        
        // Simulating API response for demo
        setTimeout(() => {
          const data = {
            text: "The discovery of agriculture was the first big step toward a civilized life.",
            author: "Arthur Keith",
            image: "https://pbs.twimg.com/media/D3oLNAiWAAAzZ-p.jpg"
          };
          
          setQuote(data);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to fetch quote');
        setLoading(false);
        console.error('Error fetching quote:', err);
      }
    };

    fetchQuote();
  }, []);

  if (loading) return <div className="quote-loading">Loading quote...</div>;
  if (error) return <div className="quote-error">{error}</div>;

  return (
    <section className="quote-section">
      <img src={quote.image} alt="Farming Quote" />
      <blockquote>
        "{quote.text}"
      </blockquote>
      <p className="quote-author">- {quote.author}</p>
    </section>
  );
};

export default Quote;