import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsRocketFill } from 'react-icons/bs';
import { thunkLogout } from '../../redux/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './profile-button.css';

function ProfileButton() {
  const user = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);


  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };


  // Handle dropdown menu display
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target))
        setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);


  const closeMenu = () => setShowMenu(false);


  const handleClick = () => {
    closeMenu();
    navigate('/mylistings')
  };


  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate('/');
    closeMenu();
    location.reload();
  };


  return (
    <div>
      <BsRocketFill className='profile-button' onClick={toggleMenu} />
      {showMenu && (
        <div className={'profile-dropdown'} ref={ulRef}>
          {user ? (
            <div>
              <div className='profile-dropdown_username'>{user.username}</div>
              <div className='profile-dropdown_email'>{user.email}</div>
              <div className='profile-dropdown_button' onClick={handleClick}>My Listings</div>
              <div className='profile-dropdown_button' onClick={logout}>Log Out</div>
            </div>
          ) : (
            <div>
              <OpenModalMenuItem
                className='profile-dropdown_button'
                itemText='Log In'
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                className='profile-dropdown_button'
                itemText='Sign Up'
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
