import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Calendar, Users, Download, ExternalLink } from 'lucide-react';

// Mock data for schemes
const MOCK_SCHEMES = [
  {
    id: 1,
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'Income support of ₹6,000 per year to all farmer families across the country in three equal installments of ₹2,000.',
    eligibility: 'All land-holding farmers with certain exclusions',
    startDate: '2019-02-01',
    endDate: null,
    status: 'active',
    beneficiaries: 1253
  },
  {
    id: 2,
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Insurance coverage and financial support to farmers in the event of crop failure due to natural calamities, pests & diseases.',
    eligibility: 'All farmers growing notified crops',
    startDate: '2016-04-01',
    endDate: null,
    status: 'active',
    beneficiaries: 842
  },
  {
    id: 3,
    name: 'Soil Health Card Scheme',
    description: 'Provides information to farmers on nutrient status of their soil along with recommendations on appropriate dosage of nutrients.',
    eligibility: 'All farmers',
    startDate: '2015-02-19',
    endDate: null,
    status: 'active',
    beneficiaries: 965
  },
  {
    id: 4,
    name: 'Kisan Credit Card (KCC)',
    description: 'Provides farmers with timely access to credit. Farmers can use KCC to purchase agriculture inputs and draw cash for their needs.',
    eligibility: 'All farmers, sharecroppers, tenant farmers',
    startDate: '1998-08-25',
    endDate: null,
    status: 'active',
    beneficiaries: 1088
  },
  {
    id: 5,
    name: 'Agricultural Technology Management Agency (ATMA)',
    description: 'Focuses on agricultural extension reforms to provide training and technology to farmers.',
    eligibility: 'All farmers and rural communities',
    startDate: '2014-05-15',
    endDate: '2025-03-31',
    status: 'closing',
    beneficiaries: 376
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  closing: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-red-100 text-red-800',
};

const SchemeModal = ({ isOpen, onClose, scheme = null, onSave }) => {
  const [formData, setFormData] = useState(
    scheme || {
      name: '',
      description: '',
      eligibility: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'active',
      beneficiaries: 0
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
                Current Beneficiaries
              </label>
              <input
                type="number"
                name="beneficiaries"
                value={formData.beneficiaries}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                min="0"
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

const SchemesPage = () => {
  const [schemes, setSchemes] = useState(MOCK_SCHEMES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentScheme, setCurrentScheme] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.eligibility.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddScheme = () => {
    setCurrentScheme(null);
    setIsModalOpen(true);
  };

  const handleEditScheme = (scheme) => {
    setCurrentScheme(scheme);
    setIsModalOpen(true);
  };

  const handleSaveScheme = (schemeData) => {
    if (currentScheme) {
      // Edit existing scheme
      setSchemes(
        schemes.map((s) => (s.id === currentScheme.id ? { ...schemeData, id: s.id } : s))
      );
    } else {
      // Add new scheme
      const newScheme = {
        ...schemeData,
        id: Math.max(0, ...schemes.map((s) => s.id)) + 1,
      };
      setSchemes([...schemes, newScheme]);
    }
  };

  const handleDeleteScheme = (id) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      setSchemes(schemes.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
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
            <Plus size={16} className="mr-2" />
            Add Scheme
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
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="closing">Closing Soon</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schemes cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{scheme.name}</h3>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[scheme.status]}`}>
                  {scheme.status === 'active' ? 'Active' : 
                   scheme.status === 'closing' ? 'Closing Soon' : 'Closed'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{scheme.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Eligibility</h4>
                  <p className="text-sm">{scheme.eligibility}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Duration</h4>
                  <div className="flex items-center text-sm">
                    <Calendar size={14} className="mr-1 text-gray-400" />
                    <span>
                      {new Date(scheme.startDate).toLocaleDateString()} 
                      {scheme.endDate ? ` to ${new Date(scheme.endDate).toLocaleDateString()}` : ' (Ongoing)'}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Beneficiaries</h4>
                  <div className="flex items-center text-sm">
                    <Users size={14} className="mr-1 text-gray-400" />
                    <span>{scheme.beneficiaries.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex space-x-3">
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <Download size={14} className="mr-1" />
                    Guidelines
                  </button>
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <ExternalLink size={14} className="mr-1" />
                    Official Website
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button 
                    className="text-green-600 hover:text-green-800"
                    onClick={() => handleEditScheme(scheme)}
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteScheme(scheme.id)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="bg-white py-12 px-4 rounded-lg shadow text-center">
          <div className="flex justify-center mb-3">
            <Calendar size={48} className="text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No schemes found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? "No matches found for your search. Try with different keywords."
              : "Start by adding government schemes for farmers."}
          </p>
          <button
            onClick={handleAddScheme}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus size={16} className="mr-2" />
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