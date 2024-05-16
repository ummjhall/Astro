const SET_FILTERS = 'filters/setFilters';
const RESET_FILTERS = 'filters/resetFilters';

const setFilters = (filterData) => {
  return {
    type: SET_FILTERS,
    filterData
  };
};

const resetFilters = () => {
  return {
    type: RESET_FILTERS
  };
};

export const setFiltersThunk = (filterData) => async dispatch => {
  dispatch(setFilters(filterData));
  return filterData;
};

export const resetFiltersThunk = () => async dispatch => {
  dispatch(resetFilters());
};

const initialState = {
  seller: 'all',
  category: 'all',
  subcategory: 'all',
  condition: {
    new: true,
    likeNew: true,
    veryGood: true,
    good: true,
    acceptable: true,
  },
  price: [0, Infinity],
  registered: 'all'
}

function filtersReducer(state = initialState, action) {
  switch(action.type) {
    case SET_FILTERS: {
      if ('condition' in action.filterData)
        return {
          ...state,
          ...action.filterData,
          condition: {
            ...state.condition,
            ...action.filterData.condition
          }
        }
      else
        return {
          ...state,
          ...action.filterData
        }
    }
    case RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
}

export default filtersReducer;
