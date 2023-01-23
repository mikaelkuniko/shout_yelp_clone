import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './index.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUser = async (e) => {
    e.preventDefault();
    // setEmail('demo@aa.io')
    // setPassword('password')
    let demoEmail = 'demo@aa.io'
    let demoPw = 'password'
    const demo = await dispatch(login(demoEmail, demoPw))
    if (demo) {
      setErrors(demo);
    }
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='outer-div'>
      <div className='login-header'>
        <h2 id='login-text'>Log in to Shout!</h2>
        <p className='login-subtext'>New to Shout? <a id='signup-link' href='/sign-up'>Sign up</a></p>
      </div>
      <div className='user-input-div'>
        <form className='user-input-form' onSubmit={onLogin}>
          <div>
            <label
            className='placeholder'
            data-placeholder='Email'>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              id='email-input'
            />
            </label>
          </div>
          <div>
          <label
            className='placeholder'
            data-placeholder='Password'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              id='password-input'
            />
            </label>
          </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
          <div className='submit-button'>
            <button type='submit'>Login</button>
            <button className='single-login' onClick={demoUser}>Demo</button>
          </div>
        </form>
      </div>
        <div className='image-div'>
          <img src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png'/>
        </div>
    </div>
  );
};

export default LoginForm;
