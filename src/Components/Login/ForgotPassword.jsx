import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from "../Login/loginimg/Teamstagramlogo.png"


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
  
    const [codeSent, setCodeSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
  
    function handleEmailChange(event) {
      setEmail(event.target.value);
    }
  
    function handleVerificationCodeChange(event) {
      setVerificationCode(event.target.value);
    }
    //
    function handleSendCodeClick() {
      // This is where you would actually send the verification code to the user's email.
      axios({
        method: "post",
        url: "http://13.125.96.165:3000/users/auth_mail",
        data: {
          email: email,
        },
      }).then(function (response) {
        console.log(response);
        if (response.status === 500) {
          alert("서버에서 에러가 발생 했습니다.");
        } else if (response.status === 201) {
        }
      });
      setCodeSent(true);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      // This is where you would actually verify the user's email and verification code.
      // Make the POST request to the server to generate the authentication code and send it via email
      axios({
        url: `http://13.125.96.165:3000/users/auth_valid?email=${email}&digit=${verificationCode}`,
      }).then(function (response) {
        if (response.status === 500) {
          alert("서버에서 에러가 발생 하였습니다.");
        } else if (response.data.message === "일치하지 않습니다.") {
          alert("인증 번호가 틀립니다.");
        } else if (response.data.message === "일치합니다.") {
          alert("인증 번호가 맞습니다.");
          navigate("/changepw");
        }
      });
    }
  
    return (
      <div className="user">
        <div className="login-container">
          <div className="instagram-logo-box">
            <img className="instagram-logo" src={logo} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="verifyemailinput">
              <div className="inputs-container">
                <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Email" />
              </div>
            </div>
            {codeSent ? (
              <>
                <div className="verifycodeinput">
                  <div className="inputs-container">
                    <input
                      type="number"
                      id="verification-code"
                      value={verificationCode}
                      onChange={handleVerificationCodeChange}
                      minLength={6}
                      maxLength={6}
                      required
                      placeholder="Verification Code"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="emailverifybtn">
                <button type="button" className="login-button" onClick={handleSendCodeClick}>
                  Send Verification Code
                </button>
              </div>
            )}
            <div className="emailverifybtn">
              <button type="submit" className="login-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

export default ForgotPassword;
