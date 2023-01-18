
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";

import './index.css'

const Navigation = ({ loaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch()
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };


  return (
    <div className='nav-container'>
      <div className='upper-nav'>
        <div className='upper-left-home'>
          <NavLink exact to="/">
            <img /> SHOUT!
          </NavLink>
        </div>
        <div className='search-bar-form-container'>
          <span>form goes here</span>
        </div>
        <div className='upper-right-buttons'>
          <div className='nav-button-container'>
              <NavLink exact to="/biz">CREATE BIZ</NavLink>
              <NavLink exact to="/writeareview">WRITE A REVIEW</NavLink>
              <div>
                {!sessionUser && (
                  <div>
                    <NavLink exact to="/login">
                      <button className='login-button'>
                        login
                      </button>
                    </NavLink>
                    <NavLink exact to="/signup">
                      <button className='signup-button'>
                        Sign Up
                      </button>
                    </NavLink>
                  </div>
                )}
                {sessionUser && (
                  <div>
                    <button onClick={logout} className='logout-user'>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Navigation;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import LowerNav from './LowerNav'

import './index.css'

const Navigation = ({loaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch()
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };


  return (
    <div className='nav-container'>
      <div className='upper-nav'>
        <div className='upper-left-home'>
          <NavLink exact to="/">
            <img/> SHOUT!
          </NavLink>
        </div>
        <div className='search-bar-form-container'>
          <span>form goes here</span>
        </div>
        <div className='upper-right-buttons'>
          <div className='nav-buttons-container'>
            <NavLink exact to="/biz">CREATE BIZ</NavLink>
            <NavLink exact to="/writeareview">WRITE A REVIEW</NavLink>
            {!sessionUser && (
              <div>
                <NavLink exact to="/login">
                  <button className='login-button'>
                  login
                  </button>
                </NavLink>
                <NavLink exact to="/signup">
                  <button className='signup-button'>
                    Sign Up
                  </button>
                </NavLink>
              </div>
            )}
            {sessionUser && (
              <div>
                <button onClick={logout} className='logout-user'>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <LowerNav/>
      </div>
    </div>
  );
}

export default Navigation;
