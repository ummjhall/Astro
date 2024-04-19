import { csrfFetch } from './csrf';

const LOAD_PRODUCTS = 'products/loadProducts';

const loadProducts = (productsData) => {
  return {
    type: LOAD_PRODUCTS,
    productsData
  };
};

export const getAllProductsThunk = () => async dispatch => {
  const res = await csrfFetch(`/api/products`);

  const productsData = await res.json();
  if (res.ok)
    dispatch(loadProducts(productsData));
  return productsData;
};

const initialState = {};

function productsReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_PRODUCTS: {
      const products = {}
      action.productsData.Products.forEach(product => {
        products[product.product_id] = product;
      });
      return {...products};
    }
    default:
      return state;
  }
}

export default productsReducer;
