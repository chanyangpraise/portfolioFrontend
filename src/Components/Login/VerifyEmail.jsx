import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../Login/loginimg/Teamstagramlogo.png";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/loginSlice";

function VerifyEmail() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const emailInput = useRef();
  const submitBtn = useRef();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleVerificationCodeChange(event) {
    setVerificationCode(event.target.value);
  }
  function validEmailCheck(email) {
    let pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return email.match(pattern);
  }
  //
  function handleSendCodeClick(event) {
    // This is where you would actually send the verification code to the user's email.

    event.preventDefault();
    setIsClicked(true);
    console.log(event);
    if (!email || !validEmailCheck(email)) {
      alert("이메일을 입력해주세요.");
    } else {
      axios({
        method: "post",
        url: "http://13.125.96.165:3000/users/auth_mail",
        data: {
          email: email,
        },
      })
        .then(function (response) {
          console.log(response);
          if (response.status === 500) {
            alert("서버에서 에러가 발생 했습니다.");
            setIsClicked(false);
          } else if (response.status === 201) {
            dispatch(login({ email: email }));
            alert("이메일 인증코드가 발송되었습니다. 확인 후 입력해주세요.");
            emailInput.current.style.display = "none";
            submitBtn.current.style.display = "block";
            setCodeSent(true);
          }
        })
        .catch((err) => alert(err));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (verificationCode === "") {
      return alert("이메일 입력 후 인증번호를 받으세요.");
    }
    // This is where you would actually verify the user's email and verification code.
    // Make the POST request to the server to generate the authentication code and send it via email
    axios({
      url: `http://13.125.96.165:3000/users/auth_valid?email=${email}&digit=${verificationCode}`,
    }).then(function (response) {
      if (response.status === 500) {
        alert("서버에서 에러가 발생 하였습니다.");
      } else if (response.data.message === "일치하지 않습니다.") {
        alert("인증번호가 틀립니다. 다시 입력해주세요.");
      } else if (response.data.message === "일치합니다.") {
        alert("인증 번호가 확인되었습니다. 회원가입을 진행해주세요.");
        navigate("/register");
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
              <input
                ref={emailInput}
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="가입할 이메일 주소를 입력해주세요."
              />
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
              <button disabled={isClicked} type="button" className="login-button" onClick={handleSendCodeClick}>
                Send Verification Code
              </button>
            </div>
          )}
          <div className="emailverifybtn">
            <button style={{ display: "none" }} ref={submitBtn} type="submit" className="login-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
