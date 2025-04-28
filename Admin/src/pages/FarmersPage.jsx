import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (farmer) {
      setFormData(farmer);
    } else {
      setFormData({
        name: '',
        location: '',
        schemes: [],
        land: '',
        crops: [],
        phone: '',
      });
    }
  }, [farmer]);

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
                  📍
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
  const [farmers, setFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFarmer, setCurrentFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000';

  // Fetch farmers data
  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/farmers`);
      
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      
      const data = await response.json();
      setFarmers(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch farmers:", err);
      setError(err.message);
      setFarmers([]);
    } finally {
      setLoading(false);
    }
  };

  // Load farmers on initial render
  useEffect(() => {
    fetchFarmers();
  }, []);

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

  const handleSaveFarmer = async (farmerData) => {
    try {
      if (currentFarmer) {
        // Edit existing farmer
        const response = await fetch(`${API_URL}/admin/farmers/${currentFarmer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(farmerData),
        });

        if (!response.ok) {
          throw new Error(`Error updating farmer: ${response.status}`);
        }

        const updatedFarmer = await response.json();
        setFarmers(farmers.map(f => f.id === currentFarmer.id ? updatedFarmer : f));
      } else {
        // Add new farmer
        const response = await fetch(`${API_URL}/admin/farmers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(farmerData),
        });

        if (!response.ok) {
          throw new Error(`Error adding farmer: ${response.status}`);
        }

        const newFarmer = await response.json();
        setFarmers([...farmers, newFarmer]);
      }
    } catch (err) {
      console.error("Failed to save farmer:", err);
      alert(`Failed to save farmer: ${err.message}`);
    }
  };

  const handleDeleteFarmer = async (id) => {
    if (window.confirm('Are you sure you want to delete this farmer?')) {
      try {
        const response = await fetch(`${API_URL}/admin/farmers/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Error deleting farmer: ${response.status}`);
        }

        setFarmers(farmers.filter(f => f.id !== id));
      } catch (err) {
        console.error("Failed to delete farmer:", err);
        alert(`Failed to delete farmer: ${err.message}`);
      }
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
            <span className="mr-2">+</span>
            Add Farmer
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-400">🔍</span>
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
              <span className="mr-2 text-gray-500">⚙️</span>
              Filter
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={fetchFarmers} 
            className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : (
        /* Farmers table */
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
                        <span className="text-green-600 mr-1">📍</span>
                        <span className="text-sm text-gray-900">{farmer.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {farmer.schemes && farmer.schemes.map((scheme, index) => (
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
                          👁️
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleEditFarmer(farmer)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteFarmer(farmer.id)}
                          title="Delete"
                        >
                          🗑️
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
      )}

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