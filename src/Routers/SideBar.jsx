import React from "react";
import { Outlet } from "react-router-dom";
import SideList from "../Components/Side/SideList";
import SideLogo from "../Components/Side/SideLogo";
import SideProfile from "../Components/Side/SideProfile";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="default_wrap">
      <div className="sidebar_left">
        <div className="sidebar_wrap">
          <div>
            <SideLogo />
            <SideList />
          </div>
          <div>
            <SideProfile />
          </div>
        </div>
      </div>
      <div className="main_right">
        <Outlet />
      </div>
    </div>
  );
}

export default SideBar;
