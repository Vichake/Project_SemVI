import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/RentInstruments/HeroSection';
import CategoryFilter from '../../components/RentInstruments/CategoryFilter';
import EquipmentGrid from '../../components/RentInstruments/EquipmentGrid';
import ModelDialog from '../../components/RentInstruments/ModelDialog';
import RentalForm from '../../components/RentInstruments/RentalForm';
import ToastNotification from '../../components/RentInstruments/ToastNotification';
import LocationFilter from '../../components/RentInstruments/LocationFilter';  // New component
import Header from '../../components/Header';
import { useUser } from '../../context/userContext';
import './css/RentInstruments.css';

const RentInstruments = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [filteredEquipmentList, setFilteredEquipmentList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [toast, setToast] = useState({ show: false, title: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationRange, setLocationRange] = useState(20); // default to 20km
  const [locationPermission, setLocationPermission] = useState('pending');
  const { userData } = useUser();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationPermission('granted');
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationPermission('denied');
        }
      );
    } else {
      setLocationPermission('unsupported');
    }
  }, []);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  // Fetch equipment data from the database
  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true);
      try {
        // Get all equipment with location data
        const response = await fetch('http://localhost:5000/api/equipment');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Transform the data and include distance calculation if user location is available
        const formattedData = data.map(item => ({
          id: item._id,
          name: item.name,
          category: item.category,
          description: item.description,
          image: item.image || `/images/${item.category}1.jpg`, // Fallback image
          price: item.price,
          models: item.models || [{ id: `${item._id}-default`, name: 'Standard', price: item.price }],
          location: {
            latitude: item.latitude || 0,
            longitude: item.longitude || 0,
            address: item.address || 'Location not specified'
          },
          distance: userLocation ? 
            calculateDistance(
              userLocation.latitude, 
              userLocation.longitude, 
              item.latitude || 0, 
              item.longitude || 0
            ) : null
        }));
        
        setEquipmentList(formattedData);
        setFilteredEquipmentList(formattedData); // Initialize filtered list with all items
        setError(null);
      } catch (err) {
        console.error("Failed to fetch equipment:", err);
        setError('Failed to load equipment data. Please try again later.');
        
        // Set fallback data in case of error
        const fallbackData = [
          {
            id: 1,
            name: 'Tractor Model A',
            category: 'tractor',
            description: 'High-power tractor suitable for heavy-duty tasks.',
            image: '/images/tractor1.jpg',
            price: 100,
            models: [
              { id: 101, name: 'Model A1', price: 90 },
              { id: 102, name: 'Model A2', price: 110 },
            ],
            location: {
              latitude: 37.7749,
              longitude: -122.4194,
              address: 'San Francisco, CA'
            },
            distance: 5 // Mock distance
          },
          {
            id: 2,
            name: 'Harvester X200',
            category: 'harvester',
            description: 'Efficient and fast crop harvesting.',
            image: '/images/harvester1.jpg',
            price: 120,
            models: [
              { id: 201, name: 'X200 Pro', price: 130 },
              { id: 202, name: 'X200 Max', price: 150 },
            ],
            location: {
              latitude: 37.7833,
              longitude: -122.4167,
              address: 'Oakland, CA'
            },
            distance: 15 // Mock distance
          },
          {
            id: 3,
            name: 'PlowMaster 3000',
            category: 'plow',
            description: 'Strong and reliable plowing tool.',
            image: '/images/plow1.jpg',
            price: 60,
            models: [
              { id: 301, name: 'Standard', price: 60 },
              { id: 302, name: 'Deluxe', price: 75 },
            ],
            location: {
              latitude: 37.8044,
              longitude: -122.2711,
              address: 'Berkeley, CA'
            },
            distance: 25 // Mock distance
          },
        ];
        
        setEquipmentList(fallbackData);
        setFilteredEquipmentList(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [userLocation]); // Re-fetch when user location changes

  // Filter equipment by category and location range
  useEffect(() => {
    let filtered = equipmentList;
    
    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Apply location range filter if user location is available
    if (userLocation && locationRange > 0) {
      filtered = filtered.filter(item => 
        item.distance !== null && item.distance <= locationRange
      );
    }
    
    setFilteredEquipmentList(filtered);
  }, [equipmentList, activeCategory, locationRange, userLocation]);

  // Extract unique categories
  const categories = ['all', ...new Set(equipmentList.map(item => item.category))];
  
  const handleSelectModel = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleModelChoose = (model) => {
    setSelectedModel(model);
    setSelectedEquipment((prev) => ({ ...prev, selectedModel: model }));
  };

  const handleRangeChange = (newRange) => {
    setLocationRange(newRange);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Form data
    const formData = new FormData(e.target);
    const rentalData = {
      equipmentId: selectedEquipment.id,
      modelId: selectedModel.id,
      userId: userData?.id,
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      quantity: formData.get('quantity'),
      // Add additional form fields as needed
    };
    
    // Submit rental to backend
    try {
      const response = await fetch('http://localhost:5000/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rentalData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit rental');
      }
      
      // Show success message
      setToast({
        show: true,
        title: 'Rental Confirmed!',
        message: `You have rented ${selectedEquipment.name} (${selectedModel.name}) successfully.`,
      });
      
      // Reset form
      setSelectedEquipment(null);
      setSelectedModel(null);
      e.target.reset();
      
    } catch (err) {
      console.error("Rental submission failed:", err);
      setToast({
        show: true,
        title: 'Rental Failed',
        message: 'There was an error processing your rental. Please try again.',
      });
    }
  };

  return (
    <div className="farmgear-main">
      <Header userData={userData} />
      <HeroSection onBrowseClick={() => document.getElementById('browse').scrollIntoView({ behavior: 'smooth' })} />

      <section id="browse" className="farmgear-section">
        <h2 className="farmgear-section-title">Explore Our Equipment</h2>
        
        <div className="filter-container">
          <CategoryFilter 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
          
          <LocationFilter 
            locationRange={locationRange}
            onRangeChange={handleRangeChange}
            locationPermission={locationPermission}
          />
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading equipment...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : filteredEquipmentList.length > 0 ? (
          <EquipmentGrid equipmentList={filteredEquipmentList} onSelectModel={handleSelectModel} />
        ) : (
          <p className="no-equipment-message">
            {locationPermission === 'denied' 
              ? 'Location access is required to find nearby equipment. Please enable location services and refresh the page.'
              : 'No equipment found within the selected range and category.'}
          </p>
        )}
      </section>

      {selectedEquipment && !selectedModel && (
        <ModelDialog
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
          onSelectModel={handleModelChoose}
        />
      )}

      {selectedModel && selectedEquipment && (
        <RentalForm
          equipment={selectedEquipment}
          model={selectedModel}
          onClose={() => {
            setSelectedEquipment(null);
            setSelectedModel(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      <ToastNotification toast={toast} onClose={() => setToast({ show: false })} />
    </div>
  );
};

export default RentInstruments;