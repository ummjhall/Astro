import { useNavigate } from 'react-router-dom';
import categories from '../../utils/categories';
import './sidenav.css';

function SideNav() {
  const navigate = useNavigate();


  const handleClick = (category, subcategory) => {
    if (subcategory)
      navigate(`/products/${category}/${subcategory}`);
    else
      navigate(`/products/${category}`);
  };


  return (
    <div className='sidenav'>
      {Object.keys(categories).map((category, i) => (
        <div key={i}>
          <div
            className='sidenav-category'
            onClick={() => handleClick(category)}
          >
            {category.split('-').join(' ')}
          </div>
          {categories[category].map((subcategory, i) => (
            <div
              key={i}
              className='sidenav-subcategory'
              onClick={() => handleClick(category, subcategory)}
            >
              {subcategory.split('-').join(' ')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SideNav;
