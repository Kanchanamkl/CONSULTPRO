import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroBG from "../../images/hero_bg.png";
import "./HeroPageStyles.scss";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Expert Counselling , Anytime, Anywhere</h1>
        <p className="hero-subtitle">
          Connect with professionals in various fields and get the advice you
          need.
        </p>
        <div className="hero-buttons">
          <a href="/register" className="btn btn-signup">
            Get Start
          </a>
          <a href="/consultant-register" className="btn btn-join-consultant">
            Join as Counselor
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
