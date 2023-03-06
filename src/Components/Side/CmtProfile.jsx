import React from "react";
import { useSelector } from "react-redux";
import "./CmtProfile.css";

function CmtProfile({ uimg, email }) {
  return (
    <div className="sidebar_profile">
      <img className="sidebar_profile_img" src={uimg} alt="profile"></img>
      <span className="sidebar_profile_user_name">{email}</span>
    </div>
  );
}

export default CmtProfile;
