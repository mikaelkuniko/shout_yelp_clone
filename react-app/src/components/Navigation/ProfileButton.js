import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";
import './index.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = (e) => {
    //   if (!ulRef.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false)
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div className="dropdown-menu">
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <NavLink exact to="/user-favorites">
                <button className='bookmark-button' onClick={closeMenu}>
                  Bookmarks
                </button>
              </NavLink>
            </li>
            <li>
              <button className="loginSign-button1" onClick={logout}>Log Out</button>
            </li>
          </>
        </div>
      </ul>
    </div>
  );
}

export default ProfileButton;
