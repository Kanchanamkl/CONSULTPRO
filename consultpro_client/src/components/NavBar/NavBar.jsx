import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBG from '../../images/hero_bg.png';
import './NavBarStyles.scss';

const NavBar = () => {
  return (
    <div >
      <div className="navbar">
        <div className="navbar-brand">
          <a href="/" className="logo">ConsultPro</a>
        </div>
        <ul className="navbar-links">
          {/* <li className='nav-item-sign-in'><Link to="/login">Sign In</Link></li> */}

          <li className='nav-item-sign-up'><a href="/login">Sign In</a></li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
