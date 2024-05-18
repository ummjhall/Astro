import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadSellerThunk } from '../../redux/sellers';
import { getAllProductsThunk } from '../../redux/products';
import { filterProducts, sortProducts } from '../../utils/functions';
import SideNav from '../Navigation/SideNav';
import './seller-details.css';

function SellerDetails() {
  const { sellerId } = useParams();
  const sellers = useSelector(state => state.sellers);
  const seller = sellers[sellerId];
  const allProducts = useSelector(state => state.products);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  let sellerProductsArray = Object.values(allProducts).filter(product => product.seller_id == sellerId);
  sellerProductsArray = filterProducts(sellerProductsArray, filters);
  sellerProductsArray = sortProducts(sellerProductsArray);


  useEffect(() => {
    dispatch(loadSellerThunk(sellerId));
    dispatch(getAllProductsThunk());
  }, [dispatch, sellerId]);


  return (
    <div className='seller-details-wrapper'>
      <SideNav />
      <h1 className='sd-heading'>Seller Details: <span className='sd-seller'>{seller.username}</span></h1>
    </div>
  );
}

export default SellerDetails;
