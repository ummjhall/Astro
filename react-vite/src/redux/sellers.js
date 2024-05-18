import { csrfFetch } from './csrf';

const LOAD_SELLER = 'sellers/loadSeller';

const loadSeller = (sellerData) => {
  return {
    type: LOAD_SELLER,
    sellerData
  };
};

export const loadSellerThunk = (sellerId) => async dispatch => {
  const res = await csrfFetch(`/api/users/${sellerId}`);

  const sellerData = await res.json();
  if (res.ok)
    dispatch(loadSeller(sellerData));
  return sellerData;
};

const initialState = {};

function sellersReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_SELLER:
      return {...state, [action.sellerData.id]: action.sellerData};
    default:
      return state;
  }
}

export default sellersReducer;
