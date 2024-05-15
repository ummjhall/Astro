import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetFiltersThunk, setFiltersThunk } from '../../redux/filters';
import categories from '../../utils/categories';
import './sidenav.css';

function SideNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ goToFilters, setGoToFilters ] = useState(false);
  const [ minPrice, setMinPrice ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');


  const handleClick = (category, subcategory) => {
    if (subcategory)
      navigate(`/products/${category}/${subcategory}`);
    else
      navigate(`/products/${category}`);
  };


  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    dispatch(resetFiltersThunk());
  };


  return (
    <div className='sidenav'>
      <div
        className='sidenav-toggle'
        onClick={() => setGoToFilters(prev => !prev)}
      >
        {goToFilters ? 'BACK TO CATEGORIES' : 'FILTER RESULTS'}
      </div>
      {!goToFilters &&
        <div className='sidenav-categories-container'>
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
      }
      {goToFilters &&
        <div className='sidenav-filters-container'>
          <button className='sf-reset' onClick={handleResetFilters}>
            Reset Filters
          </button>
          {/* <div className='sf-seller-container'>
            <div>Seller</div>
          </div> */}
          {/* category */}
          {/* subcategory */}
          {/* condition */}
          {/* price */}
          <div className='sf-price-container'>
            <div className='sf-price'>Price</div>
            <div>
              <span className='sf-price-min'>Min:{' '}</span>
              <span>
                <input
                  className='sf-price-min-input'
                  type='number'
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  onBlur={() => dispatch(setFiltersThunk({price: [minPrice, maxPrice]}))}
                />
              </span>
            </div>
            <div>
              <span className='sf-price-max'>Max:{' '}</span>
              <span>
                <input
                  className='sf-price-max-input'
                  type='number'
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  onBlur={() => dispatch(setFiltersThunk({price: [minPrice, maxPrice]}))}
                />
              </span>
            </div>
          </div>
          {/* registered */}
        </div>
      }
    </div>
  );
}

export default SideNav;
