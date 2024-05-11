import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../../redux/products';
import { useNavigate } from 'react-router-dom';
import SaleCard from './SaleCard';
import ProductTeaser from './ProductTeaser';
import FeaturedProduct from './FeaturedProduct';
import './home.css';

function Home() {
  const allProducts = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saleItems = [50, 34, 22, 48, 67];
  const techTeasers = [10, 12, 13, 14, 16];


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  return (
    <div className='home-wrapper'>
      <div className='home-container'>
        <div className='home-box home-sales'>
          <div className='home-heading'>ASTRO SALES</div>
          <div className='home-salecard-container'>
            {saleItems.map(productId => (
              <SaleCard key={productId} product={allProducts[productId]} />
            ))}
          </div>
        </div>
        <div className='home-box home-latest' onClick={() => navigate('/products/tech')}>
          <div className='home-heading'>GET THE LATEST IN TECH</div>
          <div className='home-teaser-container'>
            {techTeasers.map(productId => (
              <ProductTeaser key={productId} product={allProducts[productId]} />
            ))}
          </div>
        </div>
        <div className='home-box home-gift-card'>
          <div className='home-heading'>WIN A GIFT CARD</div>
        </div>
        <div className='home-box home-featured'>
          <div className='home-heading'>FEATURED ITEM</div>
          <FeaturedProduct product={allProducts[19]} />
        </div>
        <div className='home-box home-currencies'>
          <div className='home-heading'>CURRENCY EXCHANGE RATES</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
