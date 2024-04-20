import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './navigation.css';

function Navigation() {
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const categories = ['Space Travel', 'Tech', 'Decor', 'Food', 'Health', 'Pet', 'Collectibles'];

  return (
    <div className='nav-wrapper'>
      <div className='nav-upper-wrapper'>
        <div onClick={() => navigate('/')}>Astro</div>
        <div className='nav-user-menu'>
          {user &&
            <div onClick={() => navigate('sell')}>
              SELL
            </div>
          }
          {user &&
            <div>
              CART
            </div>
          }
          <ProfileButton />
        </div>
      </div>
      <div className='nav-lower-wrapper'>
        <div className='nav-link' onClick={() => navigate('/products')}>
          All
        </div>
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
