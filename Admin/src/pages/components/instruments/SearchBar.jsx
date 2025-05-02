import React from 'react';
import { Icons } from '../../../constants/icons.jsx';

const SearchBar = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600">
        <Icons.Search />
      </div>
    </div>
  );
};

export default SearchBar;