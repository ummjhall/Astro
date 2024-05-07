import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './navigation.css';

function Navigation() {
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const categories = ['Transport', 'Tech', 'Home', 'Apparel', 'Media',
      'Hobby', 'Grocery', 'Hygiene', 'Health', 'Pet'];


  return (
    <div className='nav-wrapper'>
      <div className='nav-upper-wrapper'>
        <div className='nav-astro' onClick={() => navigate('/')}>Astro</div>
        <div className='nav-user-menu'>
          {user &&
            <div className='nav-user-menu_button' onClick={() => navigate('/sell')}>
              SELL
            </div>
          }
          {user &&
            <div className='nav-user-menu_button' onClick={() => navigate('/cart')}>
              CART
            </div>
          }
          <ProfileButton />
        </div>
      </div>
      <div className='nav-lower-wrapper'>
        <div className='nav-link' onClick={() => navigate('/products')}>
          [ All ]
        </div>
        {categories.map((category, i) => (
          <div
            key={i}
            className='nav-link'
            onClick={() => navigate(`/products/${category.toLowerCase()}`)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
