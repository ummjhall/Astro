import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from '../components/Home/Home';
import Products from '../components/Products/Products';
import ProductCategory from '../components/Products/ProductCategory';
import ProductDetails from '../components/Products/ProductDetails';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <LoginFormPage />,
      },
      {
        path: 'signup',
        element: <SignupFormPage />,
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
        path: 'products/:category/:productId',
        element: <ProductDetails />
      }
    ]
  }
]);
