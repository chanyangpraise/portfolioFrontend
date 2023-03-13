import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import SideList from "../Components/Side/SideList";
import SideLogo from "../Components/Side/SideLogo";
import SideProfile from "../Components/Side/SideProfile";
import "./SideBar.css";

function SideBar({ loggedIn }) {
  const navigate = useNavigate();
  const isLogin = useSelector((store) => {
    return store.loginState.isLogin;
  });

  useEffect(() => {
    if (isLogin === false) {
      alert("로그인을 해주세요!");
      navigate("/");
    }
  }, []);

  return (
    <>
      {!isLogin ? null : (
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
      )}
    </>
  );
}

export default SideBar;
