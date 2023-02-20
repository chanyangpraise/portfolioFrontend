import React from "react";
import Home from "../asset/house-solid.svg";
import Profile from "../asset/user-regular.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar_wrap">
      <h1 className="sidebar_header">Gram</h1>
      <ul className="sidebar_ul">
        <li>
          <img className="sidebar_icon" src={Home} alt="home_img" />
          Home
        </li>
        <li>
          <img className="sidebar_icon" src={Profile} alt="home_img" />
          Profile
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
