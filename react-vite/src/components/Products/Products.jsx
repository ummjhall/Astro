import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../../redux/products';
import SideNav from '../Navigation/SideNav';
import ProductTile from './ProductTile';
import './products.css';

function Products() {
  const allProducts = useSelector(state => state.products);
  const allProductsArray = Object.values(allProducts);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  return (
    <div className='products-wrapper'>
      <SideNav />
      <div className='products-tile-container'>
        {allProductsArray.map(product => (
          <ProductTile key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
