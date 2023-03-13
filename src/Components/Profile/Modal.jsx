import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/slice/loginSlice";

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <div className="modalSettings">
          <p onClick={onClose} className="modalCloseBtn">
            X
          </p>
          <div className="btnContainer">
            <button
              onClick={() => {
                dispatch(reset());
                navigate("/");
              }}
              className="modalLogout"
            >
              {" "}
              로그아웃{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
