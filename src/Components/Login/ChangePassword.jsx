import React, { useState } from 'react';
import logo from "../Login/loginimg/Teamstagramlogo.png"
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      console.log("New password and confirm new password don't match");
      return;
    }

    // Call API to change password
    axios({
      method: 'post',
      url: 'http://13.125.96.165:3000/users/auth_mail',
      data: {
      email: email,
      }
  }).then(function (response) {
      if (response.status===500){
          alert("서버에서 에러가 발생 했습니다.")
      } else if (response.status===200) {
          alert("성공되었습니다.")
      } else if (response.status===201) {
          setCodeSent(true);
      }
  });
  };

  return (
    <div className="user">
              <div className="login-container">
        <div className="instagram-logo-box">
        <img className="instagram-logo" src={logo} />
    </div>
      <form onSubmit={handleSubmit}>
        <div className='changepwinput'>
      <div className="inputs-container">
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password"/>
          </div>
          <div className="inputs-container">
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password"/>
          </div>
          <div className="inputs-container">
          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirm New Password"/>
          </div>
          </div>
          <div className='changepwbtn'>
          <button className="login-button" type="submit">Change Password</button>
      </div>
      </form>
    </div>
    </div>
  );
};

export default ChangePassword;
