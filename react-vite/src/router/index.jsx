import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Home from '../components/Home/Home';
import Products from '../components/Products/Products';
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
        element: <h1>In progress</h1>
      },
      {
        path: 'products/:category/:productId',
        element: <ProductDetails />
      }
    ]
  }
]);
