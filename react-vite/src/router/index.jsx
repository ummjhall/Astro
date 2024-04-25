import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from '../components/Home/Home';
import Cart from '../components/Cart/Cart';
import Products from '../components/Products/Products';
import ProductCategory from '../components/Products/ProductCategory';
import ProductDetails from '../components/Products/ProductDetails';
import SellProductForm from '../components/Products/SellProductForm';

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
        element: <ProductCategory />
      },
      {
        path: 'products/:category/:subcategory',
        element: <ProductCategory />
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
        path: '*',
        element: <h1 style={{color: 'white'}}>Page not found</h1>
      }
    ]
  }
]);
