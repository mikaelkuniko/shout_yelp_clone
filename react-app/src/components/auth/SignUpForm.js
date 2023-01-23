import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './index.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='outer-div'>
      <div className='signup-header'>
        <h2 id='signup-text'>Sign Up for Shout!</h2>
        <p className='signup-subtext'>Connect with great local businesses</p>
      </div>
      <div className='user-input-div'>
        <form className='user-input-form' onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label
            className='placeholder'
            data-placeholder='Username'>
            <input
              type='text'
              name='username'
              placeholder='Username'
              onChange={updateUsername}
              value={username}
              id='username-input'
            ></input>
            </label>
          </div>
          <div>
            <label
            className='placeholder'
            data-placeholder='Email'>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email'
              id='email-input'
            ></input>
            </label>
          </div>
          <div>
            <label
            className='placeholder'
            data-placeholder='Password'>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='Password'
              id='pw-input'
            ></input>
            </label>
          </div>
          <div>
            <label
            className='placeholder'
            data-placeholder='Confirm Password'>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='Confirm Password'
              id='confirm-pw-input'
            ></input>
            </label>
          </div>
          <div
          // className='submit-button'
          >
            <button type='submit' id='signup-button'>Sign Up</button>
          </div>
        </form>
      </div>
      <div className='image-div'>
          <img src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png'/>
        </div>
    </div>
  );
};

export default SignUpForm;
