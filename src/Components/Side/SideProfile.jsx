import React from "react";
import { useSelector } from "react-redux";
import "./SideProfile.css";

function SideProfile() {
  const email = useSelector((store) => store.loginState.email);
  const uimg = useSelector((store) => store.loginState.uimg);

  return (
    <div className="sidebar_profile">
      <img className="sidebar_profile_img" src={uimg} alt="profile"></img>
      <span className="sidebar_profile_user_name">{email}</span>
    </div>
  );
}

export default SideProfile;
