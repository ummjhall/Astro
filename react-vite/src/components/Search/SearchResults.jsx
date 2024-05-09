import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import SideNav from '../Navigation/SideNav';
import ProductTile from '../Products/ProductTile';
import './search-results.css';

function SearchResults() {
  const allProducts = useSelector(state => state.products);
  const allProductsArray = Object.values(allProducts);
  const dispatch = useDispatch();
  const query = decodeURIComponent(useSearchParams()[0])
      .replaceAll('+', ' ')
      .replaceAll('=', '')
      .toLowerCase();


  const results = allProductsArray.filter(product => {
    return product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.details.toLowerCase().includes(query) ||
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
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
