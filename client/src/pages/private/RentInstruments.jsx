import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/RentInstruments/HeroSection';
import CategoryFilter from '../../components/RentInstruments/CategoryFilter';
import EquipmentGrid from '../../components/RentInstruments/EquipmentGrid';
import ModelDialog from '../../components/RentInstruments/ModelDialog';
import RentalForm from '../../components/RentInstruments/RentalForm';
import ToastNotification from '../../components/RentInstruments/ToastNotification';
import Header from '../../components/Header';
import { useUser } from '../../context/userContext';
import { API_URL } from '../../context/config';
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
  const { userData } = useUser();

  // Fetch equipment data from the database
  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true);
      try {
        // Get all equipment
        const response = await fetch(`${API_URL}/admin/getInstruments`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched equipment data:", data);
        
        // Transform the data to match our component structure
        const formattedData = data.map(item => ({
          id: item._id,
          name: item.instrumentName,
          category: item.instrumentCategory,
          description: `Provided by ${item.farmer}`,
          price: item.rentPerHour,
          models: [{ id: `${item._id}-default`, name: 'Standard', price: item.rentPerHour }],
          location: {
            address: item.location || 'Location not specified'
          },
          quantity: item.quantity,
          status: item.instrumentStatus,
          lastServiceDate: new Date(item.lastServiceDate).toLocaleDateString(),
          contactNumber: item.contactNumber
        }));
        
        setEquipmentList(formattedData);
        setFilteredEquipmentList(formattedData); // Initialize filtered list with all items
        setError(null);
      } catch (err) {
        console.error("Failed to fetch equipment:", err);
        setError('Failed to load equipment data. Please try again later.');        
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  // Filter equipment by category
  useEffect(() => {
    let filtered = equipmentList;
    
    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Only show active equipment
    filtered = filtered.filter(item => item.status === 'active');
    
    setFilteredEquipmentList(filtered);
  }, [equipmentList, activeCategory]);

  const handleSelectModel = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleModelChoose = (model) => {
    setSelectedModel(model);
    setSelectedEquipment((prev) => ({ ...prev, selectedModel: model }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Form data
    const formData = new FormData(e.target);
    const rentalData = {
      equipmentId: selectedEquipment.id,
      modelId: selectedModel.id,
      userId: userData?.id,
      name: formData.get('name'),
      email: formData.get('email'),
      duration: formData.get('duration'),
      // Add additional form fields as needed
    };
    
    // Submit rental to backend
    try {
      const response = await fetch(`${API_URL}/api/rentals`, {
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
        message: `You have rented ${selectedEquipment.name} (${selectedModel.name}) successfully for ${formData.get('duration')} days.`,
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
            No equipment found for the selected category.
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