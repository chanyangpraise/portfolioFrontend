import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../Login/loginimg/Teamstagramlogo.png"


function ForgotPassword() {
    const navigate = useNavigate();
    const movetochangepw = () => {
        navigate("/changepw");
    }
const [email, setEmail] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');

const handleSubmit = (event) => {
    event.preventDefault();
    // Check if email and phone number match with the user data
    // and set isValid to true or false accordingly
    // ...
    setIsValid(true); // for demo purposes
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
    <button className="login-button" type="submit" onClick={movetochangepw}>Reset Password</button>
    </div>
    </form>
    </div>
    </div>
    </div>
);
}

export default ForgotPassword;
