import React, { useState } from 'react';
// import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

 
  return (
    <header className="farm-header">
      <h1>Learn Farming Techniques</h1>
      <p className="tagline">Discover modern farming methods to boost productivity and sustainability.</p>
      
    </header>
  );
};

export default Header;