import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../../redux/products';
import { filterProducts, sortProducts } from '../../utils/functions';
import SideNav from '../Navigation/SideNav';
import ProductTile from '../Products/ProductTile';
import '../Products/products.css';
import './my-listings.css';

function MyListings() {
  const user = useSelector(state => state.session.user);
  const allProducts = useSelector(state => state.products);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  // Allow user to filter their listings
  let myListingsArray = Object.values(allProducts).filter(product => product.seller_id == user.id);
  myListingsArray = filterProducts(myListingsArray, filters);
  myListingsArray = sortProducts(myListingsArray);


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  return (
    <div className='mylistings-wrapper'>
      <SideNav />
      <div>
        <h1 className='mylistings-heading'>{(user.username + "'s ")}Listings</h1>
        <div className='products-tile-container'>
          {myListingsArray.map(listing => (
            <ProductTile key={listing.product_id} product={listing} />
          ))}
          {!myListingsArray.length &&
            <div className='products-no-products'>No products to display</div>
          }
        </div>
      </div>
    </div>
  );
}

export default MyListings;
