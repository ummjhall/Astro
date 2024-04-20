import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetailsThunk } from '../../redux/products';
import './products.css';

function ProductDetails() {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProductDetailsThunk(productId));
  }, [dispatch]);

  return (
    <div className='productdetails-wrapper'>
      {products[productId].name}
    </div>
  );
}

export default ProductDetails;
