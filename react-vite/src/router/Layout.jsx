import { Outlet } from 'react-router-dom';
import { ModalProvider, Modal } from '../context/Modal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkAuthenticate } from '../redux/session';
import Navigation from '../components/Navigation/Navigation';

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
