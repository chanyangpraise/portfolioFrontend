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
    fetch('/api/changePassword', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword })
    })
    .then(response => {
      if (response.ok) {
        console.log('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        console.log('Failed to change password');
      }
    })
    .catch(error => console.error(error));
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
          <button className="login-button" type="submit">Change Password</button>
      </form>
    </div>
    </div>
  );
};

export default ChangePassword;
