import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getCartThunk, /*removeFromCartThunk*/ } from '../../redux/cart';
import CartTile from './CartTile';
import CartCallout from './CartCallout';
import './cart.css';

function Cart() {
  const user = useSelector(state => state.session.user);
  const cartItems = useSelector(state => state.cart);
  const cartItemsArray = Object.values(cartItems);
  const dispatch = useDispatch();
  const [ total, setTotal ] = useState(0);


  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);


  // Calculate cart total
  useEffect(() => {
    let totalPrice = 0;
    cartItemsArray.forEach(item => {
      totalPrice += (item.price * item.quantity)
    });
    setTotal(totalPrice)
  }, [cartItemsArray]);


  if (!user) return <Navigate to='/' replace={true} />;

  return user && (
    <div className='cart-wrapper'>
      <h1>{(user.username + "'s ")}Cart</h1>

      {/* {cartItemsArray.length >= 3 &&
        <div>
          <div className='cart-total'>Total: ঋ{total.toLocaleString()}</div>
          <button className='cart-checkout' onClick={handleCheckout}>
            Complete Checkout
          </button>
        </div>
      } */}

      <div className='cart-container'>
        <div className='cart-tile-container'>
          {cartItemsArray.map(item => (
            <CartTile key={item.product_id} item={item} />
          ))}
          {!cartItemsArray.length &&
            <div>Nothing in Cart</div>
          }
        </div>
        {cartItemsArray.length > 0 &&
          <CartCallout total={total} items={cartItemsArray} />
        }
      </div>

      {/* {cartItemsArray.length ?
        <div>
          <div className='cart-total'>Total: ঋ{total.toLocaleString()}</div>
          <button className='cart-checkout' onClick={handleCheckout}>
            Complete Checkout
          </button>
        </div>
        :
        <div>Nothing in Cart</div>
      } */}
    </div>
  );
}

export default Cart;
