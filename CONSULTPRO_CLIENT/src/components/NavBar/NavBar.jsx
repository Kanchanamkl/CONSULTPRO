import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBG from '../../images/hero_bg.png';
import './NavBarStyles.scss';

const navbar = () => {
  return (
    <div >
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/" className="logo">ConsultPro</a>
        </div>
        <ul className="navbar-links">
          {/* <li className='nav-item-sign-in'><Link to="/login">Sign In</Link></li> */}
          <li className='nav-item-sign-up'><a href="/contact_us">Contact Us</a></li>
          <li className='nav-item-sign-up'><a href="/about">About</a></li>
          <li className='nav-item-sign-up'><a href="/login">Sign In</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default navbar;
