import React from "react";
import "./SideLogo.css";
import logo from "../../asset/Teamstagramlogo.png";

function SideLogo() {
  return (
    <div>
      <a href="/main">
        <img className="sidebar_header" src={logo}></img>
      </a>
    </div>
  );
}

export default SideLogo;
