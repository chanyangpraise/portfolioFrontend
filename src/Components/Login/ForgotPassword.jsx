import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../Login/loginimg/Teamstagramlogo.png"


function ForgotPassword() {
    const navigate = useNavigate();
    const movetochangepw = () => {
        navigate("/changepw");
    }
const [email, setEmail] = useState('');
const [verificationCode, setVerificationCode] = useState('');

function handleVerificationCodeChange(event) {
    setVerificationCode(event.target.value);
}

const handleSubmit = (event) => {
    event.preventDefault();
    // Check if email and phone number match with the user data
    // and set isValid to true or false accordingly
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
            type="number"
            id="verification-code"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            minLength={6}
            maxLength={6}
            required
            placeholder='Verification Code'
        />
            </div>
    </div>
    </div>
    <div className='resetpwbtn'>
    <button className="login-button" type="submit" onClick={movetochangepw}>Reset Password</button>
    </div>
    </form>
    </div>
    </div>
    </div>
);
}

export default ForgotPassword;
