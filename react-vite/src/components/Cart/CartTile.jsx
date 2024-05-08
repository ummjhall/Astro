import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCartThunk } from '../../redux/cart';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import QuantityModal from './QuantityModal';

function CartTile({ item }) {
  const dispatch = useDispatch();
  const category = item.category[0].toUpperCase() + item.category.slice(1);
  const subcategory = item.subcategory.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  const [ disabled, setDisabled ] = useState(false);


  const handleRemove = () => {
    setDisabled(true);
    dispatch(removeFromCartThunk(item.product_id));
  };


  return (
    <div className='cart-tile-wrapper'>
      <div className='cart-tile-info'>
        <div className='ct-name'>{item.name}</div>
        <div className='ct-info-container'>
          <div>
            <div>Sold by: <span className='ct-seller'>{item.seller}</span></div>
            <div>{item.condition}</div>
            <div className='ct-price'>ঋ {item.price}</div>
          </div>
          <div>
            <div>{category}</div>
            <div>{subcategory}</div>
            <div>Quantity: <span className='ct-quantity'>{item.quantity}</span></div>
          </div>
        </div>
        <div className='ct-subtotal'>Subtotal: ঋ{item.quantity * item.price}</div>
        <div className='ct-button-container'>
          <button><OpenModalMenuItem modalComponent={<QuantityModal item={item}/>} itemText='Update Quantity'/></button>
          <button onClick={handleRemove} disabled={disabled}>Remove from Cart</button>
        </div>
      </div>
      <div>
        <img className='ct-image' src={item.previewImage} alt='Preview Image' style={{width: '175px', height: '175px'}} />
      </div>
    </div>
  );
}

export default CartTile;
