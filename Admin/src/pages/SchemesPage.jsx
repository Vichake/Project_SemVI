import React, { useState, useEffect } from 'react';

// SVG icons as components
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const PlusIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const CalendarIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UsersIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const TagIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const MapPinIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const statusColors = {
  active: 'bg-green-100 text-green-800',
  closing: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-red-100 text-red-800',
};

const schemeTypes = ["national", "state", "specialized"];

// List of Indian states and union territories
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// API service for schemes
const SchemesAPI = {
  // Fetch all schemes
  fetchSchemes: async () => {
    try {
      const response = await fetch('/admin/schemes');
      if (!response.ok) throw new Error('Failed to fetch schemes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching schemes:', error);
      // Return empty array for now (in production, handle this better)
      return [];
    }
  },
  
  // Create a new scheme
  createScheme: async (schemeData) => {
    try {
      console.log('Creating scheme:', schemeData);

      const response = await fetch('/admin/schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schemeData)
      });
      console.log('Creating scheme:', schemeData);

      if (!response.ok) throw new Error('Failed to create scheme');
      return await response.json();
    } catch (error) {
      console.error('Error creating scheme:', error);
      throw error;
    }
  },
  
  // Update an existing scheme
  updateScheme: async (id, schemeData) => {
    try {
      const response = await fetch(`/api/schemes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schemeData)
      });
      if (!response.ok) throw new Error('Failed to update scheme');
      return await response.json();
    } catch (error) {
      console.error('Error updating scheme:', error);
      throw error;
    }
  },
  
  // Delete a scheme
  deleteScheme: async (id) => {
    try {
      const response = await fetch(`/api/schemes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete scheme');
      return true;
    } catch (error) {
      console.error('Error deleting scheme:', error);
      throw error;
    }
  }
};

// Scheme modal component
const SchemeModal = ({ isOpen, onClose, scheme = null, onSave }) => {
  const initialFormData = {
    name: '',
    description: '',
    eligibility: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'active',
    beneficiaries: 0,
    officialWebsite: '',
    guidelinesUrl: '',
    schemeType: 'national', // Default to national
    stateName: '' // Added field for state name
  };

  const [formData, setFormData] = useState(scheme || initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      alert('Failed to save scheme. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {scheme ? 'Edit Scheme' : 'Add New Scheme'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheme Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eligibility
              </label>
              <textarea
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheme Type
              </label>
              <select
                name="schemeType"
                value={formData.schemeType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="national">National</option>
                <option value="state">State-level</option>
                <option value="specialized">Specialized</option>
              </select>
            </div>

            {/* State selection dropdown - only shown when scheme type is "state" */}
            {formData.schemeType === 'state' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  name="stateName"
                  value={formData.stateName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select a state</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date (if applicable)
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="active">Active</option>
                <option value="closing">Closing Soon</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Official Website URL
              </label>
              <input
                type="url"
                name="officialWebsite"
                value={formData.officialWebsite}
                onChange={handleChange}
                placeholder="https://example.gov.in/scheme"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guidelines Document URL
              </label>
              <input
                type="url"
                name="guidelinesUrl"
                value={formData.guidelinesUrl}
                onChange={handleChange}
                placeholder="https://example.gov.in/guidelines.pdf"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main SchemesPage component
const SchemesPage = () => {
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [stateFilter, setStateFilter] = useState(''); // Added state filter
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentScheme, setCurrentScheme] = useState(null);

  // Fetch schemes on component mount
  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await SchemesAPI.fetchSchemes();
      setSchemes(data);
    } catch (error) {
      setError('Failed to fetch schemes. Please try again later.');
      console.error('Error fetching schemes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter schemes based on search term, status filter, type filter, and state filter
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = searchTerm === '' || 
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || scheme.status === statusFilter;
    const matchesType = typeFilter === '' || scheme.schemeType === typeFilter;
    const matchesState = stateFilter === '' || 
      (scheme.schemeType === 'state' && scheme.stateName === stateFilter);
    
    return matchesSearch && matchesStatus && matchesType && matchesState;
  });

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

  // Open modal for adding new scheme
  const handleAddScheme = () => {
    setCurrentScheme(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing scheme
  const handleEditScheme = (scheme) => {
    setCurrentScheme(scheme);
    setIsModalOpen(true);
  };

  // Save new or edited scheme
  const handleSaveScheme = async (schemeData) => {
    try {
      if (currentScheme) {
        // Edit existing scheme
        const updatedScheme = await SchemesAPI.updateScheme(currentScheme.id, schemeData);
        setSchemes(prevSchemes => 
          prevSchemes.map(s => s.id === currentScheme.id ? updatedScheme : s)
        );
      } else {
        // Add new scheme
        const newScheme = await SchemesAPI.createScheme(schemeData);
        setSchemes(prevSchemes => [...prevSchemes, newScheme]);
      }
      return true;
    } catch (error) {
      console.error('Error saving scheme:', error);
      throw error;
    }
  };

  // Delete a scheme
  const handleDeleteScheme = async (id) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      try {
        await SchemesAPI.deleteScheme(id);
        setSchemes(prevSchemes => prevSchemes.filter(s => s.id !== id));
      } catch (error) {
        alert('Failed to delete scheme. Please try again.');
      }
    }
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
            <div className="mt-2">
              <button 
                onClick={fetchSchemes}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Agricultural Schemes</h1>
          <p className="text-gray-600">Manage government schemes and programs for farmers</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleAddScheme}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <PlusIcon size={16} className="mr-2" />
            Add Scheme
          </button>
        </div>
      </div>

      {/* Search and filters */}
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

      {/* Schemes cards */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{scheme.name}</h3>
                    <div className="flex items-center mb-2 flex-wrap gap-2">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[scheme.status]}`}>
                        {scheme.status === 'active' ? 'Active' : 
                        scheme.status === 'closing' ? 'Closing Soon' : 'Closed'}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs leading-5 font-semibold rounded-full flex items-center">
                        <TagIcon size={12} className="mr-1" />
                        {scheme.schemeType.charAt(0).toUpperCase() + scheme.schemeType.slice(1)}
                      </span>
                      
                      {/* Display state name if it's a state-level scheme */}
                      {scheme.schemeType === 'state' && scheme.stateName && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs leading-5 font-semibold rounded-full flex items-center">
                          <MapPinIcon size={12} className="mr-1" />
                          {scheme.stateName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{scheme.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Eligibility</h4>
                    <p className="text-sm">{scheme.eligibility}</p>
                  </div>
                  <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Duration</h4>
                    <div className="flex items-center text-sm">
                      <CalendarIcon size={14} className="mr-1 text-gray-400" />
                      <span>
                        {formatDate(scheme.startDate)} 
                        {scheme.endDate ? ` to ${formatDate(scheme.endDate)}` : ' (Ongoing)'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-3">
                    {scheme.guidelinesUrl && (
                      <a 
                        href={scheme.guidelinesUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <DownloadIcon />
                        Guidelines
                      </a>
                    )}
                    
                    {scheme.officialWebsite && (
                      <a 
                        href={scheme.officialWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLinkIcon />
                        Official Website
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleEditScheme(scheme)}
                      title="Edit"
                    >
                      <EditIcon />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteScheme(scheme.id)}
                      title="Delete"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white py-12 px-4 rounded-lg shadow text-center">
          <div className="flex justify-center mb-3">
            <CalendarIcon size={48} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No schemes found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter || typeFilter || stateFilter
              ? "No matches found for your search. Try with different criteria."
              : "Start by adding government schemes for farmers."}
          </p>
          <button
            onClick={handleAddScheme}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <PlusIcon size={16} className="mr-2" />
            Add New Scheme
          </button>
        </div>
      )}

      {/* Scheme modal */}
      <SchemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scheme={currentScheme}
        onSave={handleSaveScheme}
      />
    </div>
  );
};

export default SchemesPage;