import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
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
      <div>{category}</div>
      {allProductsArray.map(product => (
        <div key={product.product_id}>
          <div>{product.name}</div>
        </div>
      ))}
    </div>
  );
}

export default Products;
