import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { TOGGLE_SIDEBAR } from '../../context/namespaces';

const Navbar = () => {
  const { state, dispatch } = useAppContext();

  const { balance } = state;

  return (
    <div className="app-navbar-container">
      <div className="menu-bars">
        {/* eslint-disable */}
        <i
          onClick={() => {
            dispatch({ type: TOGGLE_SIDEBAR });
          }}
          className="fas fa-bars"
        />
        {/* eslint-disable */}
      </div>
      <div className="welcome-text">
        <h3>Welcome</h3>
      </div>

      <div className="second">
        <div className="balance-con">
          <i className="fab fa-ethereum" />
          <p>{balance}</p>
        </div>
        <div>
          <a
            className="twitter"
            target="_blank"
            href="https://twitter.com/shawn_kel"
            rel="noreferrer"
          >
            <i className="fab fa-twitter" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
