import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import { filterProducts, sortProducts } from '../../utils/functions';
import SideNav from '../Navigation/SideNav';
import ProductTile from '../Products/ProductTile';
import './search-results.css';

function SearchResults() {
  const allProducts = useSelector(state => state.products);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();
  const query = decodeURIComponent(useSearchParams()[0])
      .replaceAll('+', ' ')
      .replaceAll('=', '')
      .toLowerCase();

  // Filter products by user filters, then sort
  let productsArray = Object.values(allProducts);
  productsArray = filterProducts(productsArray, filters);
  productsArray = sortProducts(productsArray);

  // Check for search term in product's attributes
  const results = productsArray.filter(product => {
    return product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.details.toLowerCase().includes(query) ||
      product.seller.toLowerCase().includes(query) ||
      product.upc?.toLowerCase().includes(query);
  });


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  return (
    <div className='searchresults-wrapper'>
      <SideNav />
      <div>
        <div className='sr-searching'>Searching for &apos;<span className='sr-query'>{query}</span>&apos;</div>
        <div className='searchresults-container'>
          {results.map(product => (
            <ProductTile key={product.product_id} product={product} />
          ))}
          {!results.length &&
            <div className='sr-no-products'>No products to display</div>
          }
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
