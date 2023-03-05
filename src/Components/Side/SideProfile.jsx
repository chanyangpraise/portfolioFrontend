import React from 'react';
import { useSelector } from 'react-redux';
import './SideProfile.css';

function SideProfile() {
  const userId = useSelector((store) => {
    // console.log(store.loginState.userId);
    return store.loginState.userId;
  });

  const userProfileImg = useSelector(
    (state) => state.profileState.userProfileImg
  );

  return (
    <div className="sidebar_profile">
      <img className="sidebar_profile_img" src={userProfileImg} alt="profile"></img>
      <span className="sidebar_profile_user_name">{userId}</span>
    </div>
  );
}

export default SideProfile;
