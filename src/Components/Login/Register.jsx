import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from "../Login/loginimg/Teamstagramlogo.png"
function Register() {
const navigate = useNavigate();
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
    // Send a POST request
axios({
    method: 'post',
    url: 'http://localhost:3000/user/register',
    data: {
    email: email,
    password: password,
    }
}).then(function (response) {
    if (response.status===500){
        alert("서버에서 에러가 발생했습니다")
    } else if (response.status===200) {
        alert("이미 가입된 이메일이 있습니다")
    } else if (response.status===201) {
        navigate("/")
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
        <div className="registerinput">
    <div className="inputs-container">
        <input type="email" value={email} onChange={handleEmailChange} placeholder= "Email"/>
        </div>
        <div className="inputs-container">
        <input type="password" value={password} onChange={handlePasswordChange} name="password" placeholder="Password" />
    </div>
    </div>
    <div className='registerbtn'>
    <button className="login-button" type="submit">Register</button>
    </div>
    </form>
    </div>
    </div>
);
}

export default Register;
