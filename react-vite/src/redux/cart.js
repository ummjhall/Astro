import { csrfFetch } from "./csrf";

const LOAD_CART = 'cart/loadCart';
const REMOVE_ITEM = 'cart/removeItem';

const loadCart = (cartData) => {
  return {
    type: LOAD_CART,
    cartData
  };
};

const removeItem = (productId) => {
  return {
    type: REMOVE_ITEM,
    productId
  };
};

export const getCartThunk = () => async dispatch => {
  const res = await csrfFetch(`/api/carts/current`);

  const cartData = await res.json();
  if (res.ok)
    dispatch(loadCart(cartData));
  return cartData;
};

export const addToCartThunk = async (productId, data) => {
  const res = await csrfFetch(`/api/carts/current/${productId}`, {
    method: 'POST',
    body: JSON.stringify(data)
  });

  const itemData = await res.json();
  return itemData;
};

export const removeFromCartThunk = (productId) => async dispatch => {
  const res = await csrfFetch(`/api/carts/current/${productId}`, {
    method: 'DELETE'
  });

  const message = await res.json();
  if (res.ok)
    dispatch(removeItem(productId));
  return message;
};

const initialState = {};

function cartReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_CART: {
      const cart = {};
      action.cartData.Items.forEach(item => {
        cart[item.product_id] = item;
      });
      return {...state, ...cart};
    }
    case REMOVE_ITEM: {
      const nextState = {...state};
      delete nextState[action.productId];
      return nextState;
    }
    default:
      return state;
  }
}

export default cartReducer;
