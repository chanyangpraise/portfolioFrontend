import React from "react";
import "./SideList.css";
import Home from "../../asset/house-solid.svg";
import Profile from "../../asset/user-regular.svg";
import { Link } from "react-router-dom";

function SideList() {
  return (
    <>
      <ul className="sidebar_ul">
        <li>
          <Link to="/main">
            <img className="sidebar_icon" src={Home} alt="home_img" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img className="sidebar_icon" src={Profile} alt="Profile_img" />
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default SideList;
