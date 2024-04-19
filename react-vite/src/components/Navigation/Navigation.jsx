// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './navigation.css';

function Navigation() {
  // const user = useSelector(state => state.session.user);

  return (
    <div className='nav-wrapper'>
      <NavLink to='/'>Astro</NavLink>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
