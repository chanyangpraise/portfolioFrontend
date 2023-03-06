import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../Login/loginimg/Teamstagramlogo.png";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/loginSlice";

function Logindetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movetoforgotpw = () => {
    navigate("/forgotpw");
  };
  const movetoverifyemail = () => {
    navigate("/verifyemail");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "") {
      return alert("이메일과 비밀번호를 입력해주세요.");
    }
    if (password === "") {
      return alert("비밀번호를 입력해주세요.");
    }
    // send login request to server and handle response
    // Send a POST request
    axios({
      method: "post",
      url: "http://13.125.96.165:3000/users/login",
      data: {
        email: email,
        pwd: password,
      },
    })
      .then(function (response) {
        if (response.status === 500) {
          alert("서버에서 에러가 발생 하였습니다.");
        } else if (response.data.message === "비밀번호를 찾을 수 없습니다.") {
          alert("비밀번호가 틀렸습니다.");
        } else if (response.data.message === "이메일을 찾을 수 없습니다.") {
          alert("이메일을 찾을 수 없습니다.");
        } else if (response.data.message === "로그인 성공") {
          navigate("/main");
          console.log(response.data);
          //Login 시 userId를 redux store에 저장하여 전역으로 관리할수있게 만드는 코드
          const user = { userId: response.data.info.id, uimg: response.data.info.uimg, email: email };
          dispatch(login(user));
        }
      })
      .catch((err) => alert(err));
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
              <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" />
            </div>
            <div className="inputs-container">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
          <button className="login-button" type="submit">
            Log In
          </button>
        </form>
        {/* Forgot Password */}
        <a className="password-forgot" onClick={movetoforgotpw}>
          Forgot Password?
        </a>
      </div>
      {/*Sign up*/}
      <div className="signup-container">
        <p>
          Don't have an account?{" "}
          <span className="signup" onClick={movetoverifyemail}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Logindetail;
