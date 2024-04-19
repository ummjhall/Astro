// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './navigation.css';

function Navigation() {
  // const user = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const categories = ['Space Travel', 'Tech', 'Decor', 'Food', 'Health', 'Pet', 'Collectibles'];

  return (
    <div className='nav-wrapper'>
      <div className='nav-upper-wrapper'>
        <div>Astro</div>
        <ProfileButton />
      </div>
      <div className='nav-lower-wrapper'>
        {categories.map((category, i) => (
          <div
            key={i}
            className='nav-link'
            onClick={() => navigate(`/products/${category.toLowerCase().replace(' ', '-')}`)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
