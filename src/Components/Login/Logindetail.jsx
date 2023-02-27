import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../Login/loginimg/Teamstagramlogo.png"

function Logindetail(props) {
    const navigate = useNavigate();
    const movetoregister = () => {
        navigate("/register");
    }
    const movetochangepw = () => {
        navigate("/changepw");
    }
    const movetoforgotpw = () => {
        navigate("/forgotpw");
    }
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
      // send login request to server and handle response
          // Send a POST request
axios({
    method: 'post',
    url: 'http://localhost:3000/user/login',
    data: {
    email: email,
    password: password,
    }
}).then(function (response) {
    if (response.status===500){
        alert("서버에서 에러가 발생 하였습니다.")
    } else if (response.status===200) {
        alert("이미 가입된 이메일이 있습니다")
    } else if (response.status===201) {
        navigate("/main")
    }
});
    };
return (
    <div className="user">
<div className="login-container">
    {/*Instagram Logo*/}
    <div className="instagram-logo-box">
        <img className="instagram-logo" src={logo} />
    </div>
    {/*Form Login*/}
    <form onSubmit={handleSubmit} id="login-post" method="POST">
    <div className="emailpw">
    <div className="inputs-container">
        <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder= "Email" />
    </div>
    <div className="inputs-container">
        <input type="password" value={password} onChange={handlePasswordChange} name="password" placeholder="Password" />
    </div>
    </div>
    <Link to="/main">
    <button className="login-button" type="submit">Log In</button></Link>
    </form>
    {/*Change Password */}
    <a className="password-forgot" onClick={movetochangepw}>Change Password?</a>
    {/* Forgot Password */}
    <a className="password-forgot" onClick={movetoforgotpw}>Forgot Password?</a>
</div>
{/*Sign up*/}
<div className="signup-container">
    <p>Don't have an account? <span className="signup" onClick={movetoregister}>Sign up</span></p>
</div>
</div>
)
}

export default Logindetail


