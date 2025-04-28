import React, { useState } from 'react';
import { Search, Filter, Plus, MapPin, Edit, Trash2, Eye } from 'lucide-react';

// Mock data for farmers
const MOCK_FARMERS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Punjab',
    schemes: ['PM-KISAN', 'Soil Health Card'],
    land: '5.2 acres',
    crops: ['Wheat', 'Rice'],
    phone: '+91 9876543210',
  },
  {
    id: 2,
    name: 'Anita Desai',
    location: 'Maharashtra',
    schemes: ['Pradhan Mantri Fasal Bima Yojana'],
    land: '3.7 acres',
    crops: ['Cotton', 'Sugarcane'],
    phone: '+91 9876543211',
  },
  {
    id: 3,
    name: 'Suresh Patel',
    location: 'Gujarat',
    schemes: ['Kisan Credit Card', 'PM-KISAN'],
    land: '4.5 acres',
    crops: ['Groundnut', 'Cotton'],
    phone: '+91 9876543212',
  },
  {
    id: 4,
    name: 'Lakshmi Reddy',
    location: 'Telangana',
    schemes: ['Rythu Bandhu', 'PM-KISAN'],
    land: '6.8 acres',
    crops: ['Rice', 'Turmeric'],
    phone: '+91 9876543213',
  },
  {
    id: 5,
    name: 'Mohan Singh',
    location: 'Haryana',
    schemes: ['Soil Health Card'],
    land: '8.2 acres',
    crops: ['Wheat', 'Mustard'],
    phone: '+91 9876543214',
  },
];

const FarmerModal = ({ isOpen, onClose, farmer = null, onSave }) => {
  const [formData, setFormData] = useState(
    farmer || {
      name: '',
      location: '',
      schemes: [],
      land: '',
      crops: [],
      phone: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-semibold mb-4">
          {farmer ? 'Edit Farmer' : 'Add New Farmer'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farmer Name
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
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-green-600"
                  title="Get current location"
                >
                  <MapPin size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schemes (comma separated)
              </label>
              <input
                type="text"
                name="schemes"
                value={Array.isArray(formData.schemes) ? formData.schemes.join(', ') : formData.schemes}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  schemes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land Area
              </label>
              <input
                type="text"
                name="land"
                value={formData.land}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crops (comma separated)
              </label>
              <input
                type="text"
                name="crops"
                value={Array.isArray(formData.crops) ? formData.crops.join(', ') : formData.crops}
                onChange={(e) => setFormData({
                  ...formData,
                  crops: e.target.value.split(',').map(c => c.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FarmersPage = () => {
  const [farmers, setFarmers] = useState(MOCK_FARMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFarmer, setCurrentFarmer] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFarmer = () => {
    setCurrentFarmer(null);
    setIsModalOpen(true);
  };

  const handleEditFarmer = (farmer) => {
    setCurrentFarmer(farmer);
    setIsModalOpen(true);
  };

  const handleSaveFarmer = (farmerData) => {
    if (currentFarmer) {
      // Edit existing farmer
      setFarmers(
        farmers.map((f) => (f.id === currentFarmer.id ? { ...farmerData, id: f.id } : f))
      );
    } else {
      // Add new farmer
      const newFarmer = {
        ...farmerData,
        id: Math.max(0, ...farmers.map((f) => f.id)) + 1,
      };
      setFarmers([...farmers, newFarmer]);
    }
  };

  const handleDeleteFarmer = (id) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      setFarmers(farmers.filter((f) => f.id !== id));
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Farmers</h1>
          <p className="text-gray-600">Manage farmer information and scheme allocation</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleAddFarmer}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <Plus size={16} className="mr-2" />
            Add Farmer
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search farmers by name or location..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <Filter size={16} className="mr-2 text-gray-500" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Farmers table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farmer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schemes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Land
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFarmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-lg font-medium text-green-800">
                          {farmer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                        <div className="text-sm text-gray-500">{farmer.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-green-600 mr-1" />
                      <span className="text-sm text-gray-900">{farmer.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {farmer.schemes.map((scheme, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                        >
                          {scheme}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {farmer.land}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleEditFarmer(farmer)}
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteFarmer(farmer.id)}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFarmers.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No farmers found. Add a new farmer or adjust your search.
          </div>
        )}

        <div className="px-6 py-3 flex items-center justify-between border-t">
          <div className="text-sm text-gray-500">
            Showing {filteredFarmers.length} of {farmers.length} farmers
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded-md text-sm disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md text-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Farmer modal */}
      <FarmerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        farmer={currentFarmer}
        onSave={handleSaveFarmer}
      />
    </div>
  );
};

export default FarmersPage;