// src/pages/market/FarmMarketHub.jsx

import React, { useState } from 'react';
import './css/SellProducts.css';
import Header from '../../components/Header';
import { useUser } from '../../context/userContext.jsx';
import HeroSection from '../../components/SellProducts/Hero.jsx';
import MarketSelector from '../../components/SellProducts/MarketSelector.jsx';
import ProductCategories from '../../components/SellProducts/ProductCategories.jsx';
import SellProductModal from '../../components/SellProducts/SellProductModel.jsx';
import Products from '../../components/SellProducts/Products.jsx'
// import Footer from './components/Footer';

function FarmMarketHub() {
  const { userData } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeMarket, setActiveMarket] = useState('local');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleMarketChange = (market) => {
    setActiveMarket(market);
  };

  return (
    <>
      <Header userData={userData} />
      <HeroSection toggleModal={toggleModal} />

      <main className="main-content">
        <MarketSelector activeMarket={activeMarket} onMarketChange={handleMarketChange} />
        <ProductCategories />

        <button className="button button-white" id="sellProductsButton" onClick={toggleModal}>
          Sell Products
        </button>
      </main>

      <SellProductModal visible={modalVisible} onClose={toggleModal} />
      <Products />
      {/* <Footer /> */}
    </>
  );
}

export default FarmMarketHub;
