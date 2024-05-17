import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetFiltersThunk } from '../../redux/filters';
import ProfileButton from './ProfileButton';
import Search from '../Search/Search';
import './navigation.css';

function Navigation() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = ['Transport', 'Tech', 'Home', 'Apparel', 'Media',
      'Hobby', 'Grocery', 'Cosmetic', 'Health', 'Pet'];


  const handleClick = (category) => {
    dispatch(resetFiltersThunk());
    if (category)
      navigate(`/products/${category.toLowerCase()}`);
    else
      navigate('/products');
  };


  return (
    <div className='nav-wrapper'>
      <div className='nav-upper-wrapper'>
        <div className='nav-astro' onClick={() => navigate('/')}>
          {/* <img
            className='nav-astro-img'
            src='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1715877289/Astro/astro-logo-rocket-v2_ib5exd.png'
            alt='Astro rocket'
            style={{width: '40px'}}
          /> */}
          <div className='nav-astro-img'></div>
          stro
        </div>
        <Search />
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
        <div className='nav-link' onClick={() => handleClick()}>
          [ All ]
        </div>
        {categories.map((category, i) => (
          <div
            key={i}
            className='nav-link'
            onClick={() => handleClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
