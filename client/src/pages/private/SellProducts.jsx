import { useUser } from '../../context/userContext.jsx';
import Header from '../../components/Header.jsx';
import Hero from '../../components/SellProducts/Hero.jsx';
import MarketSelector from '../../components/SellProducts/MarketSelector.jsx';
import PriceContent from '../../components/SellProducts/PriceContent.jsx';
import ProductCategories from '../../components/SellProducts/ProductCategories.jsx';
import SellProductModal from '../../components/SellProducts/SellProductModel.jsx';
import './css/SellProducts.css';

const SellProducts = () => {
    const { userData } = useUser();
  return (
    <>
        <Header userData={userData} />
        <Hero />
        <MarketSelector />
        <PriceContent />
        <ProductCategories />
        <SellProductModal />
    </>
  );
}

export default SellProducts;