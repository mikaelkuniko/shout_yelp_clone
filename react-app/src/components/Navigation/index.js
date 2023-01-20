import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import LowerNav from './LowerNav'
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar'

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
      <div id='upper-navigation'>
        <div className='upper-left-home'>
          <NavLink exact to="/">
            <img /> SHOUT!
          </NavLink>
        </div>
        <SearchBar/>
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
                <NavLink exact to="/sign-up">
                  <button className='signup-button'>
                    Sign Up
                  </button>
                </NavLink>
              </div>
            )}
            {sessionUser && (
              <div>
              <ProfileButton user={sessionUser} />
            </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <LowerNav />
      </div>
    </div>
  );
}

export default Navigation;
