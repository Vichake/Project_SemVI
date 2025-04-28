import React, { useState, useMemo } from 'react';

// Mock data for instruments
const MOCK_INSTRUMENTS = [
  {
    id: 1,
    name: 'Tractor - John Deere 5310',
    category: 'Heavy Machinery',
    status: 'active',
    location: 'Punjab',
    farmer: 'Rajesh Kumar',
    lastService: '2025-04-15',
  },
  {
    id: 2,
    name: 'Harvester - New Holland TC5.30',
    category: 'Heavy Machinery',
    status: 'maintenance',
    location: 'Haryana',
    farmer: 'Suresh Patel',
    lastService: '2025-03-22',
  },
  {
    id: 3,
    name: 'Sprayer - Aspee Bolo Power',
    category: 'Tools',
    status: 'active',
    location: 'Gujarat',
    farmer: 'Anita Desai',
    lastService: '2025-05-01',
  },
  {
    id: 4,
    name: 'Seed Drill - Mahindra 605',
    category: 'Farm Equipment',
    status: 'inactive',
    location: 'Maharashtra',
    farmer: 'Mohan Singh',
    lastService: '2025-02-10',
  },
  {
    id: 5,
    name: 'Rotavator - Shaktiman',
    category: 'Farm Equipment',
    status: 'active',
    location: 'Uttar Pradesh',
    farmer: 'Lakshmi Reddy',
    lastService: '2025-04-28',
  },
];

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
  )
};

// Memoized Form component to prevent unnecessary re-renders
const InstrumentForm = React.memo(({ formData, onChange, onSubmit, onCancel }) => {
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
            >
              <Icons.MapPin />
            </button>
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
  const [formData, setFormData] = useState(
    instrument || {
      name: '',
      category: 'Farm Equipment',
      status: 'active',
      location: '',
      farmer: '',
      lastService: new Date().toISOString().split('T')[0],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

        <InstrumentForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={onClose}
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
      <td className="px-6 py-4 whitespace-nowrap">{instrument.location}</td>
      <td className="px-6 py-4 whitespace-nowrap">{instrument.farmer}</td>
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
  const [instruments, setInstruments] = useState(MOCK_INSTRUMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInstrument, setCurrentInstrument] = useState(null);

  // Memoize filtered instruments to prevent unnecessary recalculations
  const filteredInstruments = useMemo(() => {
    if (!searchTerm.trim()) return instruments;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return instruments.filter(
      (instrument) =>
        instrument.name.toLowerCase().includes(lowerSearchTerm) ||
        instrument.farmer.toLowerCase().includes(lowerSearchTerm) ||
        instrument.location.toLowerCase().includes(lowerSearchTerm)
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

  const handleSaveInstrument = (instrumentData) => {
    if (currentInstrument) {
      // Edit existing instrument
      setInstruments(
        instruments.map((i) => (i.id === currentInstrument.id ? { ...instrumentData, id: i.id } : i))
      );
    } else {
      // Add new instrument - calculate ID only once
      const newId = Math.max(0, ...instruments.map((i) => i.id)) + 1;
      setInstruments([...instruments, { ...instrumentData, id: newId }]);
    }
  };

  const handleDeleteInstrument = (id) => {
    if (window.confirm('Are you sure you want to delete this instrument?')) {
      setInstruments((prev) => prev.filter((i) => i.id !== id));
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

      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
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

      <InstrumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        instrument={currentInstrument}
        onSave={handleSaveInstrument}
      />
    </div>
  );
};

export default InstrumentsPage;