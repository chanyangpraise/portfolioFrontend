import React, { useState } from 'react';
import "./Login.css";
import { Link, Outlet } from "react-router-dom";
import phones from "../Components/Login/loginimg/phones.png"
import picture1 from "../Components/Login/loginimg/photo-1.png"
import picture2 from "../Components/Login/loginimg/photo-2.png"
import picture3 from "../Components/Login/loginimg/photo-3.png"
import picture4 from "../Components/Login/loginimg/photo-4.png"

function Login() {
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
    };
return (
    <div className="loginpage">
    <div id="content-container">
            {/*Phone's pictures section*/}
<div className="phones">
<img src={phones} alt="pictures on phone" className="phone-image" />
            <div className="display-phone">
                <img className="picture" src={picture1} alt="#" />
                <img className="picture" src={picture2} alt="#" />
                <img className="picture" src={picture3} alt="#" />
                <img className="picture" src={picture4} alt="#" />
            </div>
</div>
            {/*User's log in section*/}
        <Outlet/>
        </div>
        </div>
    );
    }

export default Login;
