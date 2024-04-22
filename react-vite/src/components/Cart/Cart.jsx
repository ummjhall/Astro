import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../../redux/cart';
import CartTile from './CartTile';
import './cart.css';

function Cart() {
  const cartItems = useSelector(state => state.cart);
  const cartItemsArray = Object.values(cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  return (
    <div className='cart-wrapper'>
      <h1>Cart</h1>
      <div className='cart-tiles'>
        {cartItemsArray.map(item => (
          <CartTile key={item.product_id} />
        ))}
      </div>
    </div>
  );
}

export default Cart;
