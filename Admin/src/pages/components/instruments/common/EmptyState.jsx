import React from 'react';

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="text-center py-16 bg-white shadow sm:rounded-lg">
      <div className="text-gray-400 mb-4">No instruments found</div>
      <button
        onClick={onAddClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Add Your First Instrument
      </button>
    </div>
  );
};

export default EmptyState;