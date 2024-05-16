import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import { filterProducts } from '../../utils/functions';
import SideNav from '../Navigation/SideNav';
import ProductTile from './ProductTile';
import './products.css';

function Products() {
  let { category, subcategory } = useParams();
  const allProducts = useSelector(state => state.products);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  // Filter products by category, subcategory, and user filters (if not all)
  let productsArray = Object.values(allProducts);
  if (category)
    productsArray = productsArray.filter(product => product.category == category);
  if (subcategory)
    productsArray = productsArray.filter(product => product.subcategory == subcategory);
  productsArray = filterProducts(productsArray, filters);


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  return (
    <div className='products-wrapper'>
      <SideNav />
      <div className='products-tile-container'>
        {productsArray.map(product => (
          <ProductTile key={product.product_id} product={product} />
        ))}
        {!productsArray.length &&
          <div className='products-no-products'>No products to display</div>
        }
      </div>
    </div>
  );
}

export default Products;
