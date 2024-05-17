import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import { filterProducts } from '../../utils/functions';
import SideNav from '../Navigation/SideNav';
import ProductTile from '../Products/ProductTile';
import categories from '../../utils/categories';
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
  productsArray.sort((a, b) => {
    if (Object.keys(categories).indexOf(a.category) < Object.keys(categories).indexOf(b.category)) return -1;
    else if (Object.keys(categories).indexOf(a.category) > Object.keys(categories).indexOf(b.category)) return 1;
    if (categories[a.category].indexOf(a.subcategory) < categories[b.category].indexOf(b.subcategory)) return -1;
    else if (categories[a.category].indexOf(a.subcategory) > categories[b.category].indexOf(b.subcategory)) return 1;
    if (a.price < b.price) return -1;
    else if (a.price > b.price) return 1;
    return 0;
  });

  const results = productsArray.filter(product => {
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
          {!results.length &&
            <div className='sr-no-products'>No products to display</div>
          }
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
