import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from "../Login/loginimg/Teamstagramlogo.png"

function VerifyEmail() {
    const navigate = useNavigate();
    const movetoregister = () => {
        navigate("/register");
    }
const [email, setEmail] = useState('');
const [codeSent, setCodeSent] = useState(false);
const [verificationCode, setVerificationCode] = useState('');

function handleEmailChange(event) {
    setEmail(event.target.value);
}

function handleVerificationCodeChange(event) {
    setVerificationCode(event.target.value);
}

function handleSendCodeClick() {
    // This is where you would actually send the verification code to the user's email.
    // For this example, we'll just generate a random 6-digit code and log it to the console.
    const code = Math.floor(100000 + Math.random() * 900000);
    console.log(`Verification code: ${code}`);

    setCodeSent(true);
}

function handleSubmit(event) {
    event.preventDefault();
    // This is where you would actually verify the user's email and verification code.
    // For this example, we'll just log the values to the console.
    console.log(`Email: ${email}`);
    console.log(`Verification code: ${verificationCode}`);
}

return (
    <div className="user">
                <div className="login-container">
        <div className="instagram-logo-box">
    <img className="instagram-logo" src={logo} />
    </div>
    <form onSubmit={handleSubmit}>
        <div className='verifyemailinput'>
        <div className="inputs-container">
    <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder= "Email" />
    </div>
</div>
    {codeSent ? (
        <>
        <div className='verifycodeinput'>
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
        </>
    ) : (
        <div className='emailverifybtn'>
        <button type="button" className="login-button" onClick={handleSendCodeClick}>
        Send Verification Code
        </button>
        </div>
    )}
<div className='emailverifybtn'>
    <button type="submit" className="login-button" onClick={movetoregister}>Submit</button>
    </div>
    </form>
    </div>
    </div>
);
}

export default VerifyEmail;
