import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantityThunk } from "../../redux/cart";
import { useModal } from "../../context/Modal";

function QuantityModal({ item }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [ quantity, setQuantity ] = useState(item.quantity || 1);
  const [ validationErrors, setValidationErrors ] = useState({});
  const [ hasSubmitted, setHasSubmitted ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);


  useEffect(() => {
    const errors = {};

    if (quantity > item.stock)
      errors.quantity = 'Quantity exceeds available stock'

    setValidationErrors(errors);
  }, [quantity, item.stock]);


  useEffect(() => {
    if (hasSubmitted && Object.values(validationErrors).length)
      setDisabled(true);
    else
      setDisabled(false);
  }, [hasSubmitted, validationErrors]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.values(validationErrors).length)
      return;

    setDisabled(true);

    const formData = {quantity: +quantity};
    dispatch(updateQuantityThunk(item.product_id, formData));

    closeModal();
  };


  return (
    <div className='cart-quantity-wrapper'>
      <form onSubmit={handleSubmit}>
        <label>Quantity{' '}
          <div className='error'>
            {hasSubmitted && validationErrors.quantity && `${validationErrors.quantity}`}
          </div>
          <input
            className='cart-quantity-input'
            type='number'
            placeholder='Quantity'
            min={1}
            max={999999}
            value={quantity}
            onChange={
              e => e.target.value > 0 && e.target.value <= 999999 || e.target.value == '' ?
              setQuantity(e.target.value) :
              ''}
          />
        </label>
        <div className='cart-quantity-submit-container'>
          <button
            className={`cart-quantity-submit ${disabled ? '' : 'enabled'}`}
            type='submit'
            disabled={disabled}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuantityModal;
