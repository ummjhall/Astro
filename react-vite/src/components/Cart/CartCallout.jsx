import { useDispatch } from 'react-redux';
import { removeFromCartThunk } from '../../redux/cart';
import './cart-callout.css';

function CartCallout({ total, items }) {
  const dispatch = useDispatch();


  const handleCheckout = () => {
    items.forEach(item => {
      dispatch(removeFromCartThunk(item.product_id));
    });
  };


  return (
    <div className='cartcallout-wrapper'>
      <div className='cc-heading'>Cart Summary</div>
      <div>
        <div className='cc-total'>Total: ঋ{total.toLocaleString()}</div>
        <button className='cc-checkout' onClick={handleCheckout}>
          Complete Checkout
        </button>
      </div>

    </div>
  );
}

export default CartCallout;
