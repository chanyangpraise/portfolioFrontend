import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../Login/loginimg/Teamstagramlogo.png";
const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const email = useSelector((store) => {
    console.log(store.loginState.email);
    return store.loginState.email;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // Call API to change password
    axios
      .put("http://13.125.96.165:3000/users/changePwd", {
        email: email,
        pwd: newPassword,
      })
      .then((res) => {
        if (res.data.message === "이메일을 찾을 수 없습니다.") {
          alert("이메일을 찾을 수 없습니다.");
        } else if (res.data.message === "기존 비밀번호와 일치 합니다.") {
          alert("기존 비밀번호와 일치 합니다. 다른 비밀번호를 입력해주세요.");
        } else if (res.data.message === "성공적으로 바뀌었습니다.") {
          alert("성공적으로 바뀌었습니다. 로그인하세요.");
          navigate("/");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="user">
      <div className="login-container">
        <div className="instagram-logo-box">
          <img className="instagram-logo" src={logo} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="changepwinput">
            <div className="inputs-container">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
            </div>
            <div className="inputs-container">
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password"
              />
            </div>
          </div>
          <div className="changepwbtn">
            <button className="login-button" type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
