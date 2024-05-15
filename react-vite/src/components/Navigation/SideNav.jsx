import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetFiltersThunk, setFiltersThunk } from '../../redux/filters';
import categories from '../../utils/categories';
import './sidenav.css';

function SideNav() {
  const { category, subcategory } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ goToFilters, setGoToFilters ] = useState(false);
  const [ sellerAstro, setSellerAstro ] = useState(true);
  const [ sellerOther, setSellerOther ] = useState(true);
  const [ filterSubcategory, setFilterSubcategory ] = useState('all');
  const [ conditionNew, setConditionNew ] = useState(true);
  const [ conditionLikeNew, setConditionLikeNew ] = useState(true);
  const [ conditionVeryGood, setConditionVeryGood ] = useState(true);
  const [ conditionGood, setConditionGood ] = useState(true);
  const [ conditionAcceptable, setConditionAcceptable ] = useState(true);
  const [ minPrice, setMinPrice ] = useState('');
  const [ maxPrice, setMaxPrice ] = useState('');
  const [ registered, setRegistered ] = useState(true);
  const [ unregistered, setUnregistered ] = useState(true);


  useEffect(() => {
    const filterData = {
      subcategory: filterSubcategory,
      condition: {
        new: conditionNew,
        likeNew: conditionLikeNew,
        veryGood: conditionVeryGood,
        good: conditionGood,
        acceptable: conditionAcceptable
      }
    };

    if ((sellerAstro && sellerOther) || (!sellerAstro && !sellerOther))
      filterData.seller = 'all';
    else if (sellerAstro)
      filterData.seller = 'astroOnly';
    else if (sellerOther)
      filterData.seller = 'nonAstro';

    if ((registered && unregistered) || (!registered && !unregistered))
      filterData.registered = 'all';
    else if (registered)
      filterData.registered = 'registeredOnly';
    else if (unregistered)
      filterData.registered = 'unregisteredOnly';

    dispatch(setFiltersThunk(filterData));
  }, [
    dispatch, sellerAstro, sellerOther, filterSubcategory, conditionNew, conditionLikeNew,
    conditionVeryGood, conditionGood, conditionAcceptable, registered, unregistered
  ]);


  const handleClick = (category, subcategory) => {
    if (subcategory)
      navigate(`/products/${category}/${subcategory}`);
    else
      navigate(`/products/${category}`);
  };


  const handleResetFilters = () => {
    setSellerAstro(true);
    setSellerOther(true);
    setFilterSubcategory('all');
    setConditionNew(true);
    setConditionLikeNew(true);
    setConditionVeryGood(true);
    setConditionGood(true);
    setConditionAcceptable(true);
    setMinPrice('');
    setMaxPrice('');
    setRegistered(true);
    setUnregistered(true);
    dispatch(resetFiltersThunk());
  };


  return (
    <div className='sidenav-wrapper'>
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

          <div className='sf-seller-container'>
            <div>Seller</div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={sellerAstro}
                  onChange={() => setSellerAstro(prev => !prev)}
                />
                Astro
              </label>
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={sellerOther}
                  onChange={() => setSellerOther(prev => !prev)}
                />
                Other sellers
              </label>
            </div>
          </div>

          {/* category */}

          {!subcategory &&
            <div className='sf-subcategory-container'>
              <div>Subcategory</div>
              <select
                value={filterSubcategory}
                onChange={e => setFilterSubcategory(e.target.value)}
              >
                <option value='all'>All</option>
                {categories[category].map((filterSubcategory, i) => (
                  <option key={i} value={filterSubcategory}>
                    {filterSubcategory.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          }

          <div className='sf-condition-container'>
            <div>Condition</div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={conditionNew}
                  onChange={() => setConditionNew(prev => !prev)}
                />
                New
              </label>
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={conditionLikeNew}
                  onChange={() => setConditionLikeNew(prev => !prev)}
                />
                Like New
              </label>
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={conditionVeryGood}
                  onChange={() => setConditionVeryGood(prev => !prev)}
                />
                Very Good
              </label>
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={conditionGood}
                  onChange={() => setConditionGood(prev => !prev)}
                />
                Good
              </label>
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={conditionAcceptable}
                  onChange={() => setConditionAcceptable(prev => !prev)}
                />
                Acceptable
              </label>
            </div>
          </div>

          <div className='sf-price-container'>
            <div className='sf-price'>Price</div>
            <div>
              <span className='sf-price-min'>Min:{' '}</span>
              <input
                className='sf-price-min-input'
                type='number'
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                onBlur={() => dispatch(setFiltersThunk({price: [minPrice, maxPrice]}))}
              />
            </div>
            <div>
              <span className='sf-price-max'>Max:{' '}</span>
              <input
                className='sf-price-max-input'
                type='number'
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                onBlur={() => dispatch(setFiltersThunk({price: [minPrice, maxPrice]}))}
              />
            </div>
          </div>

          {/* registered */}
          <div className='sf-registered-container'>
            <div>Registration</div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={registered}
                  onChange={() => setRegistered(prev => !prev)}
                />
                ITF-registered
              </label>
            </div>
            <div>
              <label>
                <input
                  type='checkbox'
                  checked={unregistered}
                  onChange={() => setUnregistered(prev => !prev)}
                />
                Unregistered
              </label>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default SideNav;
