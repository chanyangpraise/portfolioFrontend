import React from "react";
import { useSelector } from "react-redux";
import "./CmtProfile.css";

function CmtProfile({ email }) {
  const userProfileImg = useSelector((state) => state.profileState.userProfileImg);

  return (
    <div className="sidebar_profile">
      <img className="sidebar_profile_img" src={userProfileImg} alt="profile"></img>
      <span className="sidebar_profile_user_name">{email}</span>
    </div>
  );
}

export default CmtProfile;
