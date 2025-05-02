import React, { useState, useEffect } from 'react';
import InstrumentForm from './InstrumentForm';

const InstrumentModal = ({ isOpen, onClose, instrument = null, onSave }) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
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
          instrument={instrument}
          onSave={onSave}
          onCancel={onClose}
          setIsGettingLocation={setIsGettingLocation}
        />
      </div>
    </div>
  );
};

export default InstrumentModal;