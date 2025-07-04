import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../../redux/products';
import { useNavigate } from 'react-router-dom';
import SaleCard from './SaleCard';
import ProductTeaser from './ProductTeaser';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ComingSoonModal from '../Navigation/ComingSoonModal';
import FeaturedProduct from './FeaturedProduct';
import ExchangeTile from '../Currency/ExchangeTile';
import './home.css';

function Home() {
  const allProducts = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ currencyData, setCurrencyData ] = useState({});

  const saleItems = [50, 34, 22, 48, 67];
  const techTeasers = [10, 12, 13, 14, 16];
  const currencies = ['algo', 'cfx', 'jpy', 'mkd', 'zil', 'flr', 'ugx', 'lkr', 'pyg', 'sos', 'rvn', 'mur', 'gmd', 'egp', 'amp'];


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  // Get currency exchange data from github.com/fawazahmed0/exchange-api
  // Use USD as base currency
  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`)
    .then(res => res.json())
    .then(data => setCurrencyData(data));
  }, []);


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
          <OpenModalMenuItem
            modalComponent={<ComingSoonModal />}
            className={'home-gift-card-imgwrapper'}
            itemText={
              <img
                className='home-gift-card-image'
                src={'https://res.cloudinary.com/dt2uyzpbn/image/upload/v1751366783/astro-giftcard-2_flsbwv.jpg'}
                width={150}
                height={75}
                alt='giftcard-giveaway'
              />
            }
          />
        </div>
        <div className='home-box home-featured'>
          <div className='home-heading'>FEATURED ITEM</div>
          <FeaturedProduct product={allProducts[19]} />
        </div>
        <div className='home-box home-currencies' onClick={() => navigate('/exchange-rates')}>
          <div className='home-heading'>CURRENCY EXCHANGE RATES</div>
          {/* <div className='home-subheading'>ঋ 1 USC = ......</div> */}
          <div className='home-currency-container'>
            {currencyData?.usd && currencies.map(currency => (
              <ExchangeTile key={currency} cName={currency} cValue={currencyData.usd[currency]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
