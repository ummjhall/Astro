import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../../redux/products';
import { filterProducts } from '../../utils/functions';
import SideNav from '../Navigation/SideNav';
import ProductTile from '../Products/ProductTile';
import categories from '../../utils/categories';
import '../Products/products.css';
import './my-listings.css';

function MyListings() {
  const user = useSelector(state => state.session.user);
  const allProducts = useSelector(state => state.products);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  let myListingsArray = Object.values(allProducts).filter(product => product.seller_id == user.id);

  // Allow user to filter their listings
  myListingsArray = filterProducts(myListingsArray, filters);
  myListingsArray.sort((a, b) => {
    if (Object.keys(categories).indexOf(a.category) < Object.keys(categories).indexOf(b.category)) return -1;
    else if (Object.keys(categories).indexOf(a.category) > Object.keys(categories).indexOf(b.category)) return 1;
    if (categories[a.category].indexOf(a.subcategory) < categories[b.category].indexOf(b.subcategory)) return -1;
    else if (categories[a.category].indexOf(a.subcategory) > categories[b.category].indexOf(b.subcategory)) return 1;
    if (a.price < b.price) return -1;
    else if (a.price > b.price) return 1;
    return 0;
  });


  useEffect(() => {
    dispatch(getAllProductsThunk());
  });


  return (
    <div className='mylistings-wrapper'>
      <SideNav />
      <div className='products-tile-container'>
        {myListingsArray.map(listing => (
          <ProductTile key={listing.product_id} product={listing} />
        ))}
        {!myListingsArray.length &&
          <div className='products-no-products'>No products to display</div>
        }
      </div>
    </div>
  );
}

export default MyListings;
