import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
// import { useHistory } from "react-router-dom";
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar'

import './index.css'

const Navigation = ({ loaded }) => {
  const sessionUser = useSelector(state => state.session.user);
  // const history = useHistory()
  // const dispatch = useDispatch()
  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  //   history.push('/')
  // };


  return (
    <div className='nav-container'>
      <div id='upper-navigation'>
        <div className='upper-left-home'>
          <NavLink exact to="/">
            <img src='https://i.ibb.co/YNhxfdc/shout-icon.png' className='web-icon' alt='icon'/>
          </NavLink>
        </div>
        <SearchBar/>
        <div className='upper-right-buttons'>
            <NavLink exact to="/biz/create"><span id="for-business">For Businesses</span></NavLink>
            {/* <NavLink exact to="/writeareview">WRITE A REVIEW</NavLink> */}
            {!sessionUser && (
            <div className='nav-buttons-container'>
              <div>
                <NavLink exact to="/login">
                  <button className='login-button'>
                  log in
                  </button>
                </NavLink>
              </div>
              <div>
                <NavLink exact to="/sign-up">
                  <button className='signup-button'>
                    Sign Up
                  </button>
                </NavLink>
                </div>
              </div>
            )}
            {sessionUser && (
              <div className='nav-buttons-container'>
              <ProfileButton user={sessionUser} />
            </div>
            )}

        </div>
      </div>
      {/* <div>
        <LowerNav />
      </div> */}
    </div>
  );
}

export default Navigation;
