import React, { useState, useEffect, useMemo } from 'react';
import InstrumentTable from './components/instruments/InstrumentTable';
import SearchBar from './components/instruments/SearchBar';
import AddButton from './components/instruments/AddButton';
import InstrumentModal from './components/instruments/InstrumentModal';
import LoadingSpinner from './components/instruments/common/LoadingSpinner';
import ErrorAlert from './components/instruments/common/ErrorAlert';
import EmptyState from './components/instruments/common/EmptyState';
import { API_URL } from '../constants/config';

const InstrumentsPage = () => {
  const [instruments, setInstruments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInstrument, setCurrentInstrument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingAction, setProcessingAction] = useState(false);

  // Fetch instruments data
  const fetchInstruments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/getInstruments`);
      
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
        instrument.InstrumentName.toLowerCase().includes(lowerSearchTerm) ||
        instrument.farmer.toLowerCase().includes(lowerSearchTerm) ||
        instrument.location.toLowerCase().includes(lowerSearchTerm) ||
        instrument.contactNumber.includes(searchTerm)
    );
  }, [instruments, searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
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
      setProcessingAction(true);
      
      // Remove coordinates before sending to backend
      const { coordinates, ...dataToSend } = instrumentData;
      
      const response = await fetch(`${API_URL}/admin/addInstruments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Error creating instrument: ${response.status}`);
      }

      const newInstrument = await response.json();
      setInstruments(prev => [...prev, newInstrument]);
      return {newInstrument, success: true};
    } catch (err) {
      console.error("Failed to create instrument:", err);
      alert(`Failed to create instrument: ${err.message}`);
      return {success: false};
    } finally {
      setProcessingAction(false);
    }
  };

  // Update an existing instrument
  const handleUpdateInstrument = async (id, instrumentData) => {
    try {
      setProcessingAction(true);
      
      // Remove coordinates before sending to backend
      const { coordinates, ...dataToSend } = instrumentData;
      const response = await fetch(`${API_URL}/admin/updateInstruments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Error updating instrument: ${response.status}`);
      }

      const updatedInstrument = await response.json();
      setInstruments(prev => 
        prev.map(instrument => instrument._id === id ? updatedInstrument : instrument)
      );
      return {updatedInstrument, success: true};
    } catch (err) {
      console.error("Failed to update instrument:", err);
      alert(`Failed to update instrument: ${err.message}`);
      return {success: false};
    } finally {
      setProcessingAction(false);
    }
  };

  // Delete an instrument
  const handleDeleteInstrument = async (id) => {
    if (!window.confirm('Are you sure you want to delete this instrument?')) {
      return;
    }
    
    try {
      setProcessingAction(true);
      const response = await fetch(`${API_URL}/admin/deleteInstrument/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting instrument: ${response.status}`);
      }

      setInstruments(prev => prev.filter(instrument => instrument._id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete instrument:", err);
      alert(`Failed to delete instrument: ${err.message}`);
      return false;
    } finally {
      setProcessingAction(false);
    }
  };

  // Handle save instrument (decides between adding and updating)
  const handleSaveInstrument = (instrumentData) => {
    if (currentInstrument) {
      return handleUpdateInstrument(currentInstrument._id, instrumentData);
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
          <SearchBar value={searchTerm} onChange={handleSearch} />
          <AddButton onClick={handleAddInstrument} />
        </div>
      </div>

      {loading && instruments.length === 0 ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorAlert error={error} retryAction={fetchInstruments} />
      ) : filteredInstruments.length === 0 ? (
        <EmptyState onAddClick={handleAddInstrument} />
      ) : (
        <InstrumentTable 
          instruments={filteredInstruments} 
          onEdit={handleEditInstrument} 
          onDelete={handleDeleteInstrument} 
        />
      )}

      <InstrumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        instrument={currentInstrument}
        onSave={handleSaveInstrument}
      />

      {processingAction && (
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