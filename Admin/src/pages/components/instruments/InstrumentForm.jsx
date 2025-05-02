import React, { useState, useEffect } from 'react';
import { Icons } from '../../../constants/icons.jsx';
import { INSTRUMENT_CATEGORIES, INSTRUMENT_STATUSES } from '../../../constants/instrumentData';

const InstrumentForm = React.memo(({ instrument, onSave, onCancel, setIsGettingLocation }) => {
  const defaultFormData = {
    instrumentName: '',
    instrumentCategory: INSTRUMENT_CATEGORIES[0], // 'Farm Equipment'
    instrumentStatus: INSTRUMENT_STATUSES[0], // 'active'
    rentPerHour: 0,
    location: '',
    farmer: '',
    contactNumber: '',
    lastServiceDate: new Date().toISOString(),
    quantity: 0,
  };


  const [formData, setFormData] = useState(instrument || defaultFormData);

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
              
              // Store coordinates in form data but they won't be sent to backend
              setFormData(prev => ({
                ...prev,
                location,
                coordinates: { latitude, longitude } // This is stored locally but not sent to the backend
              }));
              setIsGettingLocation(false);
            })
            .catch(error => {
              console.error("Error getting location name:", error);
              setFormData(prev => ({
                ...prev,
                location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
                coordinates: { latitude, longitude }
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

  const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await onSave(formData);

  if (result.success) {
    setFormData(defaultFormData); // reset form
    onCancel(); // close form
  }
};

  return (
    <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instrument Name
          </label>
          <input
            type="text"
            name="instrumentName"
            value={formData.instrumentName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="instrumentCategory"
            value={formData.instrumentCategory}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {INSTRUMENT_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="instrumentStatus"
            value={formData.instrumentStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {INSTRUMENT_STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rent Per Hour(Rs.)
            </label>
            <input
              type="number"
              name="rentPerHour"
              value={formData.rentPerHour}
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
              onClick={handleGetCurrentLocation}
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
            onChange={handleChange}
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
              onChange={handleChange}
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
            name="lastServiceDate"
            value={formData.lastServiceDate ? new Date(formData.lastServiceDate).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
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

export default InstrumentForm;