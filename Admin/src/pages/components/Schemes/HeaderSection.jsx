import React from 'react';
const PlusIcon = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

export const HeaderSection = ({ onAddScheme }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Agricultural Schemes</h1>
        <p className="text-gray-600">Manage government schemes and programs for farmers</p>
      </div>
      <div className="mt-4 md:mt-0">
        <button
          onClick={onAddScheme}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <PlusIcon size={16} className="mr-2" />
          Add Scheme
        </button>
      </div>
    </div>
  );
};