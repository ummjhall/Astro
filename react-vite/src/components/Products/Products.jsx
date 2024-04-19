import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import ProductTile from './ProductTile';
import './products.css';

function Products() {
  const { category } = useParams();
  const allProducts = useSelector(state => state.products);
  const dispatch = useDispatch();

  const allProductsArray = Object.values(allProducts);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  return (
    <div className='products-wrapper'>
      <div className='products-sidenav'>
        Here's the sidenav
      </div>
      <div className='products-main'>
        {allProductsArray.map(product => (
          <ProductTile key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
