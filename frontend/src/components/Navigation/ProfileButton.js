import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignUpForm';
import { useHistory } from "react-router-dom";
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

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

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
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button className="loginSign-button1" onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li className="loginSign">
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginForm />}
                />
              </li>
              <li className="loginSign">
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupForm />}
                />
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default ProfileButton;