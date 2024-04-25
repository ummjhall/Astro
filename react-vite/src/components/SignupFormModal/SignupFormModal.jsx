import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkSignup } from '../../redux/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (password != confirmPassword)
      return setErrors({confirm: 'Confirm Password field must be the same as the Password field'});

    const res = await dispatch(thunkSignup({email, username, password}));
    if (res.errors)
      setErrors(res.errors);
    else
      closeModal();
  };

  return (
    <div className='signup-wrapper'>
      <div className='signup-title'>Sign Up</div>

      <form className='signup-form' onSubmit={handleSubmit}>
        <label>Username
          <div>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          {errors.username && <div className='error'>{errors.username}</div>}
          </div>
        </label>

        <label>Email
          <div>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          {errors.email && <div className='error'>{errors.email}</div>}
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
          {errors.password && <div className='error'>{errors.password}</div>}
          </div>
        </label>

        <label>Confirm Password
          <div>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirm && <div className='error'>{errors.confirm}</div>}
          </div>
        </label>

        <button className='signup-submit' type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
