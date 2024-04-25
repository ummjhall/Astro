import categories from '../../utils/categories';
import './sidenav.css';

function SideNav() {


  return (
    <div className='sidenav'>
      {Object.keys(categories).map((category, i) => (
        <div key={i}>
          <div className='sidenav-category'>{category.split('-').join(' ')}</div>
          {categories[category].map((subcategory, i) => (
            <div key={i} className='sidenav-subcategory'>{subcategory.split('-').join(' ')}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SideNav;
