// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  // const user = useSelector(state => state.session.user);

  return (
    <div className='nav-wrapper'>
      <NavLink to='/'>Home</NavLink>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
