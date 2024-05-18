import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadSellerThunk } from '../../redux/sellers';
import { getAllProductsThunk } from '../../redux/products';
import { filterProducts, sortProducts } from '../../utils/functions';
import SideNav from '../Navigation/SideNav';
import ProductTile from '../Products/ProductTile';
import '../Products/products.css';
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


  return seller && seller.isSeller ?
    (
      <div className='seller-details-wrapper'>
        <SideNav />
        <div>
          <div className='sd-callout'>
            <h1 className='sdc-heading'>Seller Details: <span className='sdc-seller'>{seller.username}</span></h1>
            <div className='sdc-listings'>Listings: {sellerProductsArray.length}</div>
          </div>
          <div className='products-tile-container'>
            {sellerProductsArray.map(listing => (
              <ProductTile key={listing.product_id} product={listing} />
            ))}
          </div>
        </div>
      </div>
    ) :
    (
      <div className='seller-details-wrapper'>
        <SideNav />
        <div className='seller-not-found'>Seller Not Found</div>
      </div>
    );
}

export default SellerDetails;
