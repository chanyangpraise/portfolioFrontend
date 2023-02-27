import React, { useState } from 'react';
import logo from "../Login/loginimg/Teamstagramlogo.png"
function Register() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleEmailChange = (event) => {
    setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();
    // send registration request to server and handle response
};

return (
    <div className="user">
        <div className="login-container">
        <div className="instagram-logo-box">
        <img className="instagram-logo" src={logo} />
    </div>
    <form onSubmit={handleSubmit}>
        <div className="registerinput">
    <div className="inputs-container">
        <input type="email" value={email} onChange={handleEmailChange} placeholder= "Email"/>
        </div>
        <div className="inputs-container">
        <input type="password" value={password} onChange={handlePasswordChange} name="password" placeholder="Password" />
    </div>
    </div>
    <button className="login-button" type="submit">Register</button>
    </form>
    </div>
    </div>
);
}

export default Register;
