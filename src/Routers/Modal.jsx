import React from 'react';

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <div className="modalSettings">
          <p onClick={onClose} className="modalCloseBtn">
            X
          </p>

          <div className="btnContainer">
            <button className="changeEmail">이메일 변경</button>
            <button className="changeBio">설명 변경</button>
            <button className="modalLogout">로그아웃</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;
