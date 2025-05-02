import React from 'react';
import { SearchIcon } from '../../../constants/icons';
import { indianStates } from '../../../constants/data';

export const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  typeFilter, 
  setTypeFilter, 
  stateFilter, 
  setStateFilter 
}) => {
  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle type filter change
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
    // Reset state filter when changing type filter
    if (e.target.value !== 'state') {
      setStateFilter('');
    }
  };

  // Handle state filter change
  const handleStateFilterChange = (e) => {
    setStateFilter(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="closing">Closing Soon</option>
            <option value="closed">Closed</option>
          </select>
          
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            value={typeFilter}
            onChange={handleTypeFilterChange}
          >
            <option value="">All Types</option>
            <option value="national">National</option>
            <option value="state">State-level</option>
            <option value="specialized">Specialized</option>
          </select>

          {/* State filter - only shown when type filter is 'state' */}
          {typeFilter === 'state' && (
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              value={stateFilter}
              onChange={handleStateFilterChange}
            >
              <option value="">All States</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};