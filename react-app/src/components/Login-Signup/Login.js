import React from 'react'
import { login } from '../../store/session';
import { useDispatch } from 'react-redux';
import './Login.css';
import LoginForm from '../auth/LoginForm'

function Login() {
  const dispatch = useDispatch()
  const handleLogin = (e) => {
    e.preventDefault();
    return dispatch(login({ email: 'demo@aa.io', password:'password' }))
  };
  return (
    <div>
        <LoginForm/>
    </div>
  )
}

export default Login
