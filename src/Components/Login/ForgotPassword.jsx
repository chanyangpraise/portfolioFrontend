import React, { useState } from 'react';
import logo from "../Login/loginimg/Teamstagramlogo.png"

function ForgetPassword() {
const [email, setEmail] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [isValid, setIsValid] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const handleSubmit = (event) => {
    event.preventDefault();
    // Check if email and phone number match with the user data
    // and set isValid to true or false accordingly
    // ...
    setIsValid(true); // for demo purposes
}

const handleChangePassword = () => {
    // Send a request to the server to update the user password
    // with the new password
    // ...
    alert('Password changed successfully');
    setNewPassword('');
    setConfirmPassword('');
}

return (
    <div className="user">
<div className="login-container">
< div className="instagram-logo-box">
<img className="instagram-logo" src={logo} />

    <form onSubmit={handleSubmit}>
        <div className='forgotpwinput'>
            <div className='forgotpwinputcontainer'>
    <div className="inputs-container">
        <input
type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
    required
placeholder='Email'
        />
        </div>
    </div>
    </div>
    <div className='forgotpwinput'>
    <div className='forgotpwinputcontainer'>
    <div className="inputs-container">
        <input
        type="tel"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
        required
        placeholder='Phone Number'
        />
            </div>
    </div>
    </div>
    <div className='resetpwbtn'>
    <button className="login-button" type="submit">Reset Password</button>
    </div>
    {isValid && (
        <div>
                <div className="inputs-container">
        <label>
            New Password:
            <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            />
        </label>
        </div>
        <div className="inputs-container">
        <label>
            Confirm Password:
            <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            />
        </label>
        </div>
        <button type="button" onClick={handleChangePassword}>Change Password</button>
        </div>
    )}
    </form>
    </div>
    </div>
    </div>
);
}

export default ForgetPassword;
