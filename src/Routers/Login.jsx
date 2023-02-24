import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import phones from "../asset/loginimg/phones.png"
import picture1 from "../asset/loginimg/photo-1.png"
import picture2 from "../asset/loginimg/photo-2.png"
import picture3 from "../asset/loginimg/photo-3.png"
import picture4 from "../asset/loginimg/photo-4.png"
import logo from "../asset/loginimg/Teamstagramlogo.png"

function Login() {
  return (
    <div>
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
            <div className="user">
              <div className="login-container">
                  {/*Instagram Logo*/}
                  <div className="instagram-logo-box">
                    <img className="instagram-logo" src={logo} />
                  </div>
                  {/*Form Login*/}
                  <form id="login-post" method="POST">
                  <div className="inputs-container">
                      <input type="text" name="username" placeholder="Phone number, username or email" />
                  </div>
                  <div className="inputs-container">
                      <input type="password" name="password" placeholder="Password" />
                  </div>
                  <Link to="/main">
                  <button className="login-button">Log In</button></Link>
                  </form>
                  {/*Password recovery*/}
                  <a className="password-forgot" href="#" target="_blank">Forgot password?</a>
            </div>
            {/*Sign up*/}
            <div className="signup-container">
                <p>Don't have an account? <a className="signup" href="#" target="_blank">Sign up</a></p>
            </div>
            </div>
        </div>
        </div>
    );
    }

export default Login;
