const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
	const res = await fetch(`/api/auth/`);

  const data = await res.json();
  if (data.errors) return;

	if (res.ok)
		dispatch(setUser(data));
  return data;
};

export const thunkLogin = (credentials) => async dispatch => {
  const res = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  const userData = await res.json();
  if (res.ok)
    dispatch(setUser(userData));
  return userData;
};

export const thunkSignup = (user) => async (dispatch) => {
  const res = await fetch(`/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

  const resData = await res.json();
  if (res.ok)
    dispatch(setUser(resData));
  return resData;
};

export const thunkLogout = () => async (dispatch) => {
  await fetch(`/api/auth/logout`);
  dispatch(removeUser());
};

const initialState = {user: null};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user};
    case REMOVE_USER:
      return {...state, user: null};
    default:
      return state;
  }
}

export default sessionReducer;
