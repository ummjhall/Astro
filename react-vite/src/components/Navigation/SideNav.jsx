import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { resetFiltersThunk, setFiltersThunk } from '../../redux/filters';
import categories from '../../utils/categories';
import './sidenav.css';

function SideNav() {
  const { category, subcategory } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const cachedReset = useCallback(handleResetFilters, [dispatch]);

  // Track user filters to be sent to filter thunk
  const [ goToFilters, setGoToFilters ] = useState(false);
  const [ sellerAstro, setSellerAstro ] = useState(true);
  const [ sellerOther, setSellerOther ] = useState(true);
  const [ filterCategory, setFilterCategory ] = useState('all');
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


  // Reset filters when user navigates to category with NavBar
  useEffect(() => {
    cachedReset();
  }, [cachedReset, location]);


  // Filter products immediately when any filter value is changed
  // Except minPrice and maxPrice, which update onBlur
  useEffect(() => {
    const filterData = {
      category: filterCategory,
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
    dispatch, sellerAstro, sellerOther, filterCategory, filterSubcategory,
    conditionNew, conditionLikeNew, conditionVeryGood, conditionGood, conditionAcceptable,
    registered, unregistered
  ]);


  // Update subcategory value when category is changed
  useEffect(() => {
    if (filterCategory != 'all' && !(categories[filterCategory].includes(filterSubcategory)))
      setFilterSubcategory('all');
  }, [filterCategory, filterSubcategory]);


  const handleClick = (category, subcategory) => {
    dispatch(resetFiltersThunk());
    if (subcategory)
      navigate(`/products/${category}/${subcategory}`);
    else
      navigate(`/products/${category}`);
  };


  function handleResetFilters() {
    setSellerAstro(true);
    setSellerOther(true);
    setFilterCategory('all');
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
  }


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
            <div className='sf-heading'>Seller</div>
            <div className='sf-indent'>
              <label>
                <input
                  type='checkbox'
                  checked={sellerAstro}
                  onChange={() => setSellerAstro(prev => !prev)}
                />
                <span className='sf-text'>Astro</span>
              </label>
            </div>
            <div className='sf-indent'>
              <label>
                <input
                  type='checkbox'
                  checked={sellerOther}
                  onChange={() => setSellerOther(prev => !prev)}
                />
                <span className='sf-text'>Other sellers</span>
              </label>
            </div>
          </div>

          {!category &&
            <div className='sf-category-container'>
              <div className='sf-heading'>Category</div>
              <div className='sf-indent'>
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                >
                  <option value='all'>All</option>
                  {Object.keys(categories).map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat[0].toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }

          {!subcategory &&
            <div className='sf-subcategory-container'>
              <div className='sf-heading'>Subcategory</div>
              <div className='sf-indent'>
                <select
                  value={filterSubcategory}
                  onChange={e => setFilterSubcategory(e.target.value)}
                >
                  <option value='all'>All</option>
                  {category && categories[category].map((subcat, i) => (
                    <option key={i} value={subcat}>
                      {subcat.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                  {!category && filterCategory != 'all' && categories[filterCategory].map((subcat, i) => (
                    <option key={i} value={subcat}>
                      {subcat.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }

          <div className='sf-condition-container'>
            <div className='sf-heading'>Condition</div>
            <div className='sf-indent'>
              <label>
                <input
                  type='checkbox'
                  checked={conditionNew}
                  onChange={() => setConditionNew(prev => !prev)}
                />
                <span className='sf-text'>New</span>
              </label>
            </div>
            <div className='sf-indent'>
              <label>
                <input
                  type='checkbox'
                  checked={conditionLikeNew}
                  onChange={() => setConditionLikeNew(prev => !prev)}
                />
                <span className='sf-text'>Like New</span>
              </label>
            </div>
            <div className='sf-indent'>
              <label>
                <input
                  type='checkbox'
                  checked={conditionVeryGood}
                  onChange={() => setConditionVeryGood(prev => !prev)}
                />
                <span className='sf-text'>Very Good</span>
              </label>
            </div>
            <div className='sf-indent'>
              <label>
                <input
                  type='checkbox'
                  checked={conditionGood}
                  onChange={() => setConditionGood(prev => !prev)}
                />
                <span className='sf-text'>Good</span>
              </label>
            </div>
            <div className='sf-indent'>
              <label>
                <input
                  type='checkbox'
                  checked={conditionAcceptable}
                  onChange={() => setConditionAcceptable(prev => !prev)}
                />
                <span className='sf-text'>Acceptable</span>
              </label>
            </div>
          </div>

          <div className='sf-price-container'>
            <div className='sf-heading sf-price'>Price</div>
            <div className='sf-indent'>
              <span className='sf-price-min'>Min:{' '}</span>
              <input
                className='sf-price-min-input'
                type='number'
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                onBlur={() => dispatch(setFiltersThunk({price: [minPrice, maxPrice]}))}
              />
            </div>
            <div className='sf-indent'>
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

          <div className='sf-registered-container'>
            <div className='sf-heading'>Registration</div>
            <div className='sf-indent'>
              <label>
                <input
                  type='checkbox'
                  checked={registered}
                  onChange={() => setRegistered(prev => !prev)}
                />
                <span className='sf-text'>ITF-registered</span>
              </label>
            </div>
            <div className='sf-indent'>
              <label>
                <input
                  type='checkbox'
                  checked={unregistered}
                  onChange={() => setUnregistered(prev => !prev)}
                />
                <span className='sf-text'>Unregistered</span>
              </label>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default SideNav;
