import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../Login/loginimg/Teamstagramlogo.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const sendVerBtn = useRef();
  const verInput = useRef();
  const emailInput = useRef();
  const resetBtn = useRef();

  function handleVerificationCodeChange(event) {
    setVerificationCode(event.target.value);
  }
  function validEmailCheck(email) {
    let pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return email.match(pattern);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if email and phone number match with the user data
    // and set isValid to true or false accordingly
    axios
      .get(`http://13.125.96.165:3000/users/auth_valid?email=${email}&digit=${verificationCode}`)
      .then((res) => {
        if (res.status === 500) {
          alert("서버에서 에러가 발생 하였습니다.");
        } else if (res.data.message === "일치하지 않습니다.") {
          alert("인증 번호가 틀립니다.");
        } else if (res.data.message === "일치합니다.") {
          alert("인증 번호가 맞습니다. 새로운 비밀번호 입력해주세요.");
          navigate("/changepw");
        }
      })
      .catch((err) => alert("err"));
  };

  const onClick = (event) => {
    event.preventDefault();
    if (!email || !validEmailCheck(email)) {
      alert("이메일을 입력해주세요.");
    } else {
      axios
        .post("http://13.125.96.165:3000/users/auth_mail", {
          email: email,
        })
        .then((res) => {
          if (res.status === 500) {
            alert("서버에서 에러가 발생 하였습니다.");
          } else if (res.data.message === "성공되었습니다.") {
            alert("이메일 인증코드가 발송되었습니다.");
            sendVerBtn.current.style.display = "none";
            verInput.current.style.display = "block";
            emailInput.current.style.display = "none";
            resetBtn.current.style.display = "block";
          }
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <div className="user">
      <div className="login-container">
        <div className="instagram-logo-box">
          <img className="instagram-logo" src={logo} />
          <form onSubmit={handleSubmit}>
            <div className="forgotpwinput">
              <div className="forgotpwinputcontainer">
                <div className="inputs-container">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="가입한 이메일주소를 입력해주세요."
                    ref={emailInput}
                  />
                </div>
              </div>
            </div>
            <div className="forgotpwinput">
              <div className="forgotpwinputcontainer">
                <div className="inputs-container">
                  <input
                    ref={verInput}
                    type="number"
                    id="verification-code"
                    value={verificationCode}
                    onChange={handleVerificationCodeChange}
                    minLength={6}
                    maxLength={6}
                    required
                    placeholder="Verification Code"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            <div className="resetpwbtn">
              <button ref={sendVerBtn} className="login-button" style={{ marginBottom: "1rem" }} onClick={onClick}>
                Send Verification Code
              </button>
              <button ref={resetBtn} style={{ display: "none" }} className="login-button" type="submit">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
