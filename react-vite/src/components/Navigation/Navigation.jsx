// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './navigation.css';

function Navigation() {
  // const user = useSelector(state => state.session.user);

  return (
    <div className='nav-wrapper'>
      <div className='nav-upper-wrapper'>
        <div>Astro</div>
        <ProfileButton />
      </div>
      <div className='nav-lower-wrapper'>
        <div>Space Travel</div>
        <div>Tech</div>
        <div>Decor</div>
        <div>Food</div>
        <div>Health</div>
        <div>Pet</div>
        <div>Collectibles</div>
      </div>
    </div>
  );
}

export default Navigation;
