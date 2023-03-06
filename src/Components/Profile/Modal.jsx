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
            <a href="/">
              <button className="modalLogout"> 로그아웃 </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
