import React from "react";
import { useSelector } from "react-redux";
import "./SideProfile.css";

function SideProfile() {
  const userId = useSelector((store) => {
    console.log(store.loginState.userId);
    return store.loginState.userId;
  });
  return (
    <div className="sidebar_profile">
      <div className="sidebar_profile_img">{}</div>
      <span className="sidebar_profile_user_name">{userId}</span>
    </div>
  );
}

export default SideProfile;
