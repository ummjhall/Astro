import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from '../components/Home/Home';
import Cart from '../components/Cart/Cart';
import Products from '../components/Products/Products';
import ProductDetails from '../components/Products/ProductDetails';
import SellProductForm from '../components/Products/SellProductForm';
import SearchResults from '../components/Search/SearchResults';
import ExchangeRates from '../components/Currency/ExchangeRates';
import SellerDetails from '../components/User/SellerDetails';
import MyListings from '../components/User/MyListings';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <LoginFormPage />
      },
      {
        path: 'signup',
        element: <SignupFormPage />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'products/:category',
        element: <Products />
      },
      {
        path: 'products/:category/:subcategory',
        element: <Products />
      },
      {
        path: 'products/:category/:subcategory/:productId',
        element: <ProductDetails />
      },
      {
        path: 'sell',
        element: <SellProductForm />
      },
      {
        path: 'sell/:productId/update',
        element: <SellProductForm type={'update'} />
      },
      {
        path: 'search-results',
        element: <SearchResults />
      },
      {
        path: 'exchange-rates',
        element: <ExchangeRates />
      },
      {
        path: 'seller/:sellerId',
        element: <SellerDetails />
      },
      {
        path: 'mylistings',
        element: <MyListings />
      },
      {
        path: '*',
        element: <h1 style={{color: 'white'}}>Page not found</h1>
      }
    ]
  }
]);
