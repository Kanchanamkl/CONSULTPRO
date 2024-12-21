import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroBG from "../../images/hero_bg.png";
import "./HeroPageStyles.scss";

const Hero = () => {
  return (
    <div className="hero">
      {/* <nav className="navbar">
        <div className="navbar-brand">
          <a href="/" className="logo">ConsultPro</a>
        </div>
        <ul className="navbar-links">
          <li className='nav-item-sign-in'><Link to="/login">Sign In</Link></li>
          <li className='nav-item-contact-us'><a href="/contact_us">Contact Us</a></li>
        </ul>
      </nav> */}

      <div className="hero-content">
        <h1 className="hero-title">Expert Consultation, Anytime, Anywhere</h1>
        <p className="hero-subtitle">
          Connect with professionals in various fields and get the advice you
          need.
        </p>
        <div className="hero-buttons">
          <a href="/register" className="btn btn-signup">
            Get Start
          </a>
          <a href="/consultant-register" className="btn btn-join-consultant">
            Join as Consultant
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
