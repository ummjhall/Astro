import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartThunk } from "../../redux/cart";

function CartTile({ item }) {
  const dispatch = useDispatch();
  const [ disabled, setDisabled ] = useState(false);

  const handleRemove = async () => {
    setDisabled(true);
    const res = await dispatch(removeFromCartThunk(item.product_id));
  };

  return (
    <div className='cart-tile-wrapper'>
      <div>{item.name}</div>
      <div>{item.condition}</div>
      <div>{item.category}</div>
      <div>{item.subcategory}</div>
      <div>ঋ{item.price}</div>
      <div>Quantity: {item.quantity}</div>
      <div>Subtotal: ঋ{item.quantity * item.price}</div>
      <button onClick={handleRemove} disabled={disabled}>Remove from Cart</button>
    </div>
  );
}

export default CartTile;
