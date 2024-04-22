import { csrfFetch } from './csrf';

const LOAD_PRODUCTS = 'products/loadProducts';
const LOAD_PRODUCT_DETAILS = 'products/loadProductDetails';
// const LIST_PRODUCT = 'products/listProduct';

const loadProducts = (productsData) => {
  return {
    type: LOAD_PRODUCTS,
    productsData
  };
};

const loadProductDetails = (productData) => {
  return {
    type: LOAD_PRODUCT_DETAILS,
    productData
  };
};

// const listProduct = (formData) => {

// }

export const getAllProductsThunk = () => async dispatch => {
  const res = await csrfFetch(`/api/products`);

  const productsData = await res.json();
  if (res.ok)
    dispatch(loadProducts(productsData));
  return productsData;
};

export const getProductDetailsThunk = (productId) => async dispatch => {
  const res = await csrfFetch(`/api/products/${productId}`);

  const productData = await res.json();
  if (res.ok)
    dispatch(loadProductDetails(productData));
  return productData;
};

export const listProductThunk = async (formData) => {
  const res = await csrfFetch(`/api/products/`, {
    method: 'POST',
    body: JSON.stringify(formData)
  });

  const productData = await res.json();
  return productData;
};

const initialState = {};

function productsReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_PRODUCTS: {
      const products = {};
      action.productsData.Products.forEach(product => {
        products[product.product_id] = product;
      });
      return {...products};
    }
    case LOAD_PRODUCT_DETAILS: {
      return {...state, [action.productData.product_id]: action.productData};
    }
    default:
      return state;
  }
}

export default productsReducer;
