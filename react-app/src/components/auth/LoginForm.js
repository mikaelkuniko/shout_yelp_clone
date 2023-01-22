import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useModal } from "../../context/Modal";
import './LoginForm.css'

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
    <div className='log-in-form-div'>
      <div className='login-header'>
        <h2 id='login-text'>Log in to Shout!</h2>
        <p class='login-subtext'>New to Shout? <a id='signup-link' href='/sign-up'>Sign up</a></p>
      </div>
      <form onSubmit={onLogin} className='login-form'>
        <div className='login-inputs'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />

          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          </div>
          <button type='submit'>Login</button>
          <button className='single-login' onClick={demoUser}>Demo</button>
      </form>



    </div>
  );
};

export default LoginForm;
