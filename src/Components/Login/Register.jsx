import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../Login/loginimg/Teamstagramlogo.png";
import { useSelector } from "react-redux";

function Register() {
  const email = useSelector((store) => {
    console.log(store.loginState.email);
    return store.loginState.email;
  });

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send registration request to server and handle response
    // Send a POST request
    if (password === confirmPassword) {
      axios({
        method: "post",
        url: "http://13.125.96.165:3000/users/register",
        data: {
          email: email,
          pwd: password,
          phone: phone,
        },
      })
        .then(function (response) {
          if (response.status === 500) {
            alert("서버에서 에러가 발생했습니다");
          } else if (response.status === 200) {
            alert("이미 가입된 이메일이 있습니다. 비밀번호를 찾거나 로그인해주세요.");
            navigate("/");
          } else if (response.status === 201) {
            alert("회원가입 완료하였습니다. 로그인해주세요.");
            navigate("/");
          } else alert("비밀번호가 같지 않습니다.");
        })
        .catch((err) => alert(err));
    }
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
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="inputs-container">
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
              />
            </div>
            <div className="inputs-container">
              <input type="phone" value={phone} onChange={handlePhoneChange} name="phone" placeholder="Phone" />
            </div>
          </div>
          <div className="registerbtn">
            <button className="login-button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
