import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ open, onClose }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showBioForm, setShowBioForm] = useState(false);
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5173/change-email', { email });
      setShowEmailForm(false);
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitBio = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5173/change-bio', { bio });
      setShowBioForm(false);
      setBio('');
    } catch (error) {
      console.log(error);
    }
  };

  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <div className="modalSettings">
          <p onClick={onClose} className="modalCloseBtn">
            X
          </p>
          <div className="btnContainer">
            {/* {showEmailForm ? (
              <form className="modalForm" onSubmit={handleSubmitEmail}>
                <input
                  className="modalInput"
                  type="email"
                  placeholder="새 이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="formBtn" type="submit">
                  변경
                </button>
                <button
                  className="formBtn"
                  onClick={() => setShowEmailForm(false)}
                >
                  취소
                </button>
              </form>
            ) : (
              <button
                className="changeEmail"
                onClick={() => setShowEmailForm(true)}
              >
                이메일 변경
              </button>
            )} */}
            <button className="modalLogout">로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
