import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../../redux/products';
import FeaturedProduct from './FeaturedProduct';
import ProductTeaser from './ProductTeaser';
import './home.css';

function Home() {
  const allProducts = useSelector(state => state.products);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  return (
    <div className='home-wrapper'>
      <div className='home-container'>
        <div className='home-box home-box1'>
          <div className='home-heading'>ASTRO SALES</div>
        </div>
        <div className='home-box home-box2'>
          <div className='home-heading'>GET THE LATEST IN TECH</div>
          <ProductTeaser product={allProducts[10]} />
        </div>
        <div className='home-box home-box3'>
          <div className='home-heading'>WIN A GIFT CARD</div>
        </div>
        <div className='home-box home-box4'>
          <div className='home-heading'>FEATURED ITEM</div>
          <FeaturedProduct product={allProducts[19]} />
        </div>
        <div className='home-box home-box5'>
          <div className='home-heading'>CURRENCY EXCHANGE RATES</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
