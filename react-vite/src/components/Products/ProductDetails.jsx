import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProductThunk, getProductDetailsThunk } from '../../redux/products';
import { addToCartThunk, getCartThunk } from '../../redux/cart';
import './products.css';

function ProductDetails() {
  const { productId } = useParams();
  const product = useSelector(state => state.products[productId]);
  const user = useSelector(state => state.session.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ disabled, setDisabled ] = useState(true);


  useEffect(() => {
    dispatch(getProductDetailsThunk(productId));
  }, [dispatch, productId]);


  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);


  useEffect(() => {
    if (productId in cart)
      setDisabled(true);
    else
      setDisabled(false);
  }, [productId, cart]);


  const handleAdd = async () => {
    const data = {quantity: 1};
    const res = await addToCartThunk(productId, data);
    if (res)
      return navigate('/cart');
  };


  const handleDelete = async () => {
    const res = await deleteProductThunk(productId);
    if (res)
      return navigate('/');
  };


  return product ?
    (
      <div className='productdetails-wrapper'>
        {product.seller_id == user.id && (
          <div>
            <button onClick={() => navigate(`/sell/${product.product_id}/update`)}>
              Edit Listing
            </button>
            <button onClick={handleDelete}>
              Delete Listing
            </button>
          </div>
        )}
        {product.name}
        {product.seller_id != user.id && (
          <div>
            <button onClick={handleAdd} disabled={disabled}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    ) :
    (
      <div className='productdetails-wrapper'>
        Product not found
      </div>
    );
}

export default ProductDetails;
