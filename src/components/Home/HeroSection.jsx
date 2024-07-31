import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = ({ title, subtitle, link, image }) => {
  return (
    <section className="hero_section align_center">
      <div className="align_center">
        <h2 className="hero_title">{title}</h2>
        <p className="hero_subtitle">{subtitle}</p>
        <Link to={link} className="hero_link">
          Buy Now
        </Link>
      </div>
      <div className="align_center">
        <img src={image} alt="" className="hero_img" />
      </div>
    </section>
  );
};

export default HeroSection;
