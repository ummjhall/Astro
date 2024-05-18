import { useEffect, useState } from 'react';
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
  const [ aggregateResults, setAggregateResults ] = useState(false);
  const query = decodeURIComponent(useSearchParams()[0])
      .replaceAll('+', ' ')
      .replaceAll('=', '')
      .toLowerCase();

  // Filter products by user filters, then sort
  let productsArray = Object.values(allProducts);
  productsArray = filterProducts(productsArray, filters);
  productsArray = sortProducts(productsArray);

  // Check for search term in product's attributes
  const allResults = productsArray.filter(product => {
    return product.name.toLowerCase().includes(query) ||
      product.seller.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.details.toLowerCase().includes(query) ||
      product.upc?.toLowerCase().includes(query);
  });

  // Separate into groups for UX
  const nameResults = allResults.filter(product => product.name.toLowerCase().includes(query));
  const sellerResults = allResults.filter(product => product.seller.toLowerCase().includes(query));
  const descriptionResults = allResults.filter(product => {
    return product.description.toLowerCase().includes(query) ||
        product.details.toLowerCase().includes(query);
  });
  const upcResults = allResults.filter(product => product.upc?.toLowerCase().includes(query));


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  return (
    <div className='searchresults-wrapper'>
      <SideNav />
      <div>
        <div className='sr-searching'>
          <div>Searching for <span className='sr-query'>{query}</span></div>
          <div className='sr-aggregate'>
            <label>
              <input
                type='checkbox'
                checked={aggregateResults}
                onChange={() => setAggregateResults(prev => !prev)}
              />
              <span className=''>{' '}Aggregate Results</span>
            </label>
          </div>
        </div>

        <div>
          {!allResults.length &&
            <div className='sr-no-products'>No products to display</div>
          }
        </div>

        {aggregateResults &&
          <div className='searchresults-container'>
            {allResults.map(product => (
              <ProductTile key={product.product_id} product={product} />
            ))}
          </div>
        }

        {!aggregateResults &&
          <>
            {nameResults.length > 0 &&
              <>
                <div className='sr-found-in'>Found in: Product Name</div>
                <div className='searchresults-container'>
                  {nameResults.map(product => (
                    <ProductTile key={product.product_id} product={product} />
                  ))}
                </div>
              </>
            }
            {sellerResults.length > 0 &&
              <>
                <div className='sr-found-in'>Found in: Seller Name</div>
                <div className='searchresults-container'>
                  {sellerResults.map(product => (
                    <ProductTile key={product.product_id} product={product} />
                  ))}
                </div>
              </>
            }
            {descriptionResults.length > 0 &&
              <>
                <div className='sr-found-in'>Found in: Product Description/Details</div>
                <div className='searchresults-container'>
                  {descriptionResults.map(product => (
                    <ProductTile key={product.product_id} product={product} />
                  ))}
                </div>
              </>
            }
            {upcResults.length > 0 &&
              <>
                <div className='sr-found-in'>Found in: Product UPC</div>
                <div className='searchresults-container'>
                  {upcResults.map(product => (
                    <ProductTile key={product.product_id} product={product} />
                  ))}
                </div>
              </>
            }
          </>
        }
      </div>
    </div>
  );
}

export default SearchResults;
