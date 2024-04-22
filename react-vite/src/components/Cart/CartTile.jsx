function CartTile({ item }) {


  return (
    <div className='cart-tile-wrapper'>
      <div>{item.name}</div>
      <div>{item.condition}</div>
      <div>{item.category}</div>
      <div>{item.subcategory}</div>
      <div>ঋ{item.price}</div>
      <div>Quantity: {item.quantity}</div>
      <div>Subtotal: ঋ{item.quantity * item.price}</div>
    </div>
  );
}

export default CartTile;
