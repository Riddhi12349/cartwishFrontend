import React from "react";
import "./LinkWithIcon.css";
import { NavLink } from "react-router-dom";

const LinkWithIcon = ({ title, link, emoji, sidebar }) => {
  return (
    <div className="align_center">
      <NavLink
        to={link}
        className={sidebar ? "align_center sidebar_link" : "align_center"}
      >
        {title} <img src={emoji} alt="an emoji" className="link_emoji" />
      </NavLink>
    </div>
  );
};

export default LinkWithIcon;
