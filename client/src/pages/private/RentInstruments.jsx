import React, { useState } from 'react';
import HeroSection from '../../components/RentInstruments/HeroSection';
import CategoryFilter from '../../components/RentInstruments/CategoryFilter';
import EquipmentGrid from '../../components/RentInstruments/EquipmentGrid';
import ModelDialog from '../../components/RentInstruments/ModelDialog';
import RentalForm from '../../components/RentInstruments/RentalForm';
import ToastNotification from '../../components/RentInstruments/ToastNotification';
import Header from '../../components/Header';
import { useUser } from '../../context/userContext';
import './css/RentInstruments.css';

const initialEquipment = [
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
  },
];

const RentInstruments = () => {
  const [equipmentList] = useState(initialEquipment);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [toast, setToast] = useState({ show: false, title: '', message: '' });
  const { userData } = useUser();

  const handleSelectModel = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleModelChoose = (model) => {
    setSelectedModel(model);
    setSelectedEquipment((prev) => ({ ...prev, selectedModel: model }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setToast({
      show: true,
      title: 'Rental Confirmed!',
      message: `You have rented ${selectedEquipment.name} (${selectedModel.name}) successfully.`,
    });
    setSelectedEquipment(null);
    setSelectedModel(null);
    e.target.reset();
  };

  const filteredEquipment =
    activeCategory === 'all'
      ? equipmentList
      : equipmentList.filter((item) => item.category === activeCategory);

  return (
    <div className="farmgear-main">
      <Header userData={userData} />
      <HeroSection onBrowseClick={() => document.getElementById('browse').scrollIntoView({ behavior: 'smooth' })} />

      <section id="browse" className="farmgear-section">
        <h2 className="farmgear-section-title">Explore Our Equipment</h2>
        <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <EquipmentGrid equipmentList={filteredEquipment} onSelectModel={handleSelectModel} />
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
