import React from "react";
import { useSelector } from "react-redux";
import "./BoardProfile.css";

function BoardProfile({ uimg, email }) {
  return (
    <div className="sidebar_profile">
      <img className="sidebar_profile_img" src={uimg} alt="profile"></img>
      <span className="sidebar_profile_user_name">{email}</span>
    </div>
  );
}

export default BoardProfile;
