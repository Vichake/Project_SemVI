import React, { useState, useMemo, useEffect } from 'react';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-red-100 text-red-800',
};

// Custom icons to replace Lucide React
const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Trash2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )
};

// Memoized Form component to prevent unnecessary re-renders
const InstrumentForm = React.memo(({ formData, onChange, onSubmit, onCancel, onGetCurrentLocation }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instrument Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Farm Equipment">Farm Equipment</option>
            <option value="Heavy Machinery">Heavy Machinery</option>
            <option value="Tools">Tools</option>
            <option value="Irrigation">Irrigation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
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
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-green-600"
              title="Get current location"
              onClick={onGetCurrentLocation}
            >
              <Icons.MapPin />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="0.0001"
              name="lat"
              value={formData.coordinates?.lat || ''}
              onChange={(e) => onChange({
                target: {
                  name: 'coordinates',
                  value: { ...formData.coordinates, lat: parseFloat(e.target.value) }
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="0.0001"
              name="lng"
              value={formData.coordinates?.lng || ''}
              onChange={(e) => onChange({
                target: {
                  name: 'coordinates',
                  value: { ...formData.coordinates, lng: parseFloat(e.target.value) }
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned Farmer
          </label>
          <input
            type="text"
            name="farmer"
            value={formData.farmer}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icons.Phone />
            </div>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={onChange}
              pattern="[+]?[0-9\s-]+"
              placeholder="+91 9876543210"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Service Date
          </label>
          <input
            type="date"
            name="lastService"
            value={formData.lastService}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
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
  );
});

const InstrumentModal = ({ isOpen, onClose, instrument = null, onSave }) => {
  const defaultFormData = {
    name: '',
    category: 'Farm Equipment',
    status: 'active',
    location: '',
    coordinates: { lat: 0, lng: 0 },
    farmer: '',
    contactNumber: '',
    lastService: new Date().toISOString().split('T')[0],
  };

  const [formData, setFormData] = useState(instrument || defaultFormData);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    setFormData(instrument || defaultFormData);
  }, [instrument]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding to get address from coordinates
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              const location = data.display_name ? 
                data.display_name.split(',').slice(0, 3).join(',') : 
                'Unknown Location';
              
              setFormData(prev => ({
                ...prev,
                location,
                coordinates: { lat: latitude, lng: longitude }
              }));
              setIsGettingLocation(false);
            })
            .catch(error => {
              console.error("Error getting location name:", error);
              setFormData(prev => ({
                ...prev,
                coordinates: { lat: latitude, lng: longitude }
              }));
              setIsGettingLocation(false);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please check your browser permissions.");
          setIsGettingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsGettingLocation(false);
    }
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
          {instrument ? 'Edit Instrument' : 'Add New Instrument'}
        </h2>

        {isGettingLocation && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
              <p>Getting your location...</p>
            </div>
          </div>
        )}

        <InstrumentForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={onClose}
          onGetCurrentLocation={handleGetCurrentLocation}
        />
      </div>
    </div>
  );
};

// Memoized table row component to prevent unnecessary re-renders
const InstrumentRow = React.memo(({ instrument, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{instrument.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{instrument.category}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[instrument.status]}`}>
          {instrument.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Icons.MapPin className="mr-1 text-gray-400" />
          <span>{instrument.location}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div>{instrument.farmer}</div>
          <div className="text-xs text-gray-500">{instrument.contactNumber}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{instrument.lastService}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => onEdit(instrument)}
          className="text-blue-600 hover:text-blue-900"
        >
          <Icons.Edit />
        </button>
        <button
          onClick={() => onDelete(instrument.id)}
          className="text-red-600 hover:text-red-900 ml-4"
        >
          <Icons.Trash2 />
        </button>
      </td>
    </tr>
  );
});

const InstrumentsPage = () => {
  const [instruments, setInstruments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInstrument, setCurrentInstrument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000'; // Base API URL

  // Fetch instruments data
  const fetchInstruments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/instruments`);
      
      if (!response.ok) {
        throw new Error(`Error fetching instruments: ${response.status}`);
      }
      
      const data = await response.json();
      setInstruments(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch instruments:", err);
      setError("Failed to load instruments. Please try again later.");
      setInstruments([]);
    } finally {
      setLoading(false);
    }
  };

  // Load instruments on initial render
  useEffect(() => {
    fetchInstruments();
  }, []);

  // Memoize filtered instruments to prevent unnecessary recalculations
  const filteredInstruments = useMemo(() => {
    if (!searchTerm.trim()) return instruments;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return instruments.filter(
      (instrument) =>
        instrument.name.toLowerCase().includes(lowerSearchTerm) ||
        instrument.farmer.toLowerCase().includes(lowerSearchTerm) ||
        instrument.location.toLowerCase().includes(lowerSearchTerm) ||
        instrument.contactNumber.includes(searchTerm)
    );
  }, [instruments, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddInstrument = () => {
    setCurrentInstrument(null);
    setIsModalOpen(true);
  };

  const handleEditInstrument = (instrument) => {
    setCurrentInstrument(instrument);
    setIsModalOpen(true);
  };

  // Create a new instrument
  const handleCreateInstrument = async (instrumentData) => {
    try {
      setLoading(true);
      console.log("Creating instrument:", instrumentData);
      const response = await fetch(`${API_URL}/admin/instruments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(instrumentData),
      });

      if (!response.ok) {
        throw new Error(`Error creating instrument: ${response.status}`);
      }

      const newInstrument = await response.json();
      setInstruments(prev => [...prev, newInstrument]);
      return newInstrument;
    } catch (err) {
      console.error("Failed to create instrument:", err);
      alert(`Failed to create instrument: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing instrument
  const handleUpdateInstrument = async (id, instrumentData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/instruments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(instrumentData),
      });

      if (!response.ok) {
        throw new Error(`Error updating instrument: ${response.status}`);
      }

      const updatedInstrument = await response.json();
      setInstruments(prev => 
        prev.map(instrument => instrument.id === id ? updatedInstrument : instrument)
      );
      return updatedInstrument;
    } catch (err) {
      console.error("Failed to update instrument:", err);
      alert(`Failed to update instrument: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete an instrument
  const handleDeleteInstrument = async (id) => {
    if (!window.confirm('Are you sure you want to delete this instrument?')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/instruments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting instrument: ${response.status}`);
      }

      setInstruments(prev => prev.filter(instrument => instrument.id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete instrument:", err);
      alert(`Failed to delete instrument: ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle save instrument (decides between adding and updating)
  const handleSaveInstrument = (instrumentData) => {
    if (currentInstrument) {
      return handleUpdateInstrument(currentInstrument.id, instrumentData);
    } else {
      return handleCreateInstrument(instrumentData);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Farming Instruments</h1>
          <p className="text-sm text-gray-500">Manage all farming instruments and their details</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600">
              <Icons.Search />
            </div>
          </div>
          <button
            onClick={handleAddInstrument}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            <div className="mr-2">
              <Icons.Plus />
            </div>
            Add Instrument
          </button>
        </div>
      </div>

      {loading && instruments.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={fetchInstruments}
            className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      ) : filteredInstruments.length === 0 ? (
        <div className="text-center py-16 bg-white shadow sm:rounded-lg">
          <div className="text-gray-400 mb-4">No instruments found</div>
          <button
            onClick={handleAddInstrument}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Your First Instrument
          </button>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer & Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInstruments.map((instrument) => (
                  <InstrumentRow 
                    key={instrument.id}
                    instrument={instrument}
                    onEdit={handleEditInstrument}
                    onDelete={handleDeleteInstrument}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <InstrumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        instrument={currentInstrument}
        onSave={handleSaveInstrument}
      />

      {loading && instruments.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstrumentsPage;