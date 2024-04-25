import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkLogin } from '../../redux/session';
import './loginform.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(thunkLogin({credential, password}));
    if (res.message == 'Invalid credentials')
      setErrors({credentials: res.message});
    else
      closeModal();
  };


  const handleDemoLogin = async () => {
    await dispatch(thunkLogin({credential: 'Demo', password: 'password'}));
    closeModal();
  }


  return (
    <div className='login-wrapper'>
      <div className='login-title'>Log In</div>

      {errors.credentials && <div className='error'>{errors.credentials}</div>}

      <form className='login-form' onSubmit={handleSubmit}>
        <label>Username or Email
          <div>
            <input
              type='text'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
        </label>

        <label>Password
          <div>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </label>

        <button className='login-submit' type='submit'>Log In</button>
      </form>

      <div className='login-demo-signin' onClick={handleDemoLogin}>
        Log In as Demo User
      </div>
    </div>
  );
}

export default LoginFormModal;
