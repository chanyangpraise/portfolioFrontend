import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container">
      <div className="box">
        <div className="heading">TeamGram</div>
        <form className="login-form">
          <div className="field">
            <input id="username" type="name" placeholder="Username or email" />
            <label for="username">Username or email</label>
          </div>
          <div className="field">
            <input id="password" type="password" placeholder="password" />
            <label for="password">Password</label>
          </div>
          <Link to="/main">
            <button className="login-button" title="login">
              Log In
            </button>
          </Link>
          <div className="other">
            <a className="forgot-password" href="#">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
      <div class="box">
        <p>
          Don't have an account?{" "}
          <a className="signup" href="#">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
