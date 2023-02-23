import React, { useRef, useState } from "react";
import "./RightMain.css";
import imgButton from "../asset/image-regular.svg";
import HeartImg from "../asset/heart-regular.svg";
import SideProfile from "../Components/SideProfile";

function RightMain() {
  const textarea = useRef();
  const imgbutton = useRef();
  const imgAlert = useRef();
  const sendButton = useRef();
  const [text, setText] = useState();
  const [texts, setTexts] = useState([]);
  const [img, setImg] = useState();
  const [imgs, setImgs] = useState([]);

  const textAdd = (event) => {
    // 버튼 활성화 비활성화
    if (textarea.current.value === "") {
      sendButton.current.disabled = true;
    } else {
      sendButton.current.disabled = false;
    }
    setText(event.target.value);
    // textarea ResizeHeight //
    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  // submit //
  const onSubmit = (event) => {
    // onSubmit 새로고침 안되게
    event.preventDefault();
    if (imgbutton.current.value === "") {
      imgAlert.current.style = " opacity:1; transition:1s;";
    } else {
      setText("");
      setImg("");
      sendButton.current.disabled = true;
      // Submit 했을때 textarea height 초기화
      textarea.current.style.height = "auto";
      // textarea의 값이 빈 값일때 Submit 안되게
      if (text === "") {
        return;
      }
      // 배열에 담기
      setTexts((current) => [text, ...current]);
      setImgs((current) => [img, ...current]);
      imgbutton.current.value = "";
    }
  };

  // img add //
  const ImgAdd = (e) => {
    // 경고창숨김
    if (imgbutton.current.value === "") {
      null;
    } else {
      imgAlert.current.style = " opacity:0; transition:1s;";
    }

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  const imgInputClick = () => {
    imgbutton.current.click();
  };

  return (
    <>
      <div className="main_header">
        <h1>Home</h1>
      </div>
      <form onSubmit={onSubmit} className="main_wrap">
        <span ref={imgAlert} className="main_img_alert">
          사진을 첨부해주세요.
        </span>
        <div>
          <textarea
            onChange={textAdd}
            ref={textarea}
            className="main_input"
            type="text"
            placeholder="무슨 일 이야?"
            rows={1}
            value={text}
          />
          <img src={img} alt="#" className="main_input_img" />
        </div>
        <div className="main_bottom_box">
          <input
            type="file"
            className="main_img_button"
            accept="image/*"
            ref={imgbutton}
            onChange={ImgAdd}
            style={{ display: "none" }}
          />
          <img src={imgButton} className="img_send_button" alt="imgSendButton" onClick={imgInputClick}></img>
          <button className="main_send_button" ref={sendButton} disabled>
            Send
          </button>
        </div>
      </form>
      <ul className="main_post_out_wrap">
        {texts.map((v, i) => (
          <div className="main_post_in_wrap" key={i}>
            <div className="main_post_profile">
              <div>
                <SideProfile />
              </div>
              <div>
                <button className="main_follow_button">Follow</button>
              </div>
            </div>
            <div className="main_post_imgText">
              <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>{v}</pre>
              <img className="main_post_img" src={imgs[i]} alt="#"></img>
            </div>
            <div className="main_post_bottom">
              <div className="main_post_heart_check">
                <img src={HeartImg} alt="heart_check" className="main_post_heart_img" />
                <span>1</span>
              </div>
              <div className="main_post_bottom_menu">
                <span>댓글</span>
                <span>수정</span>
                <span>삭제</span>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}

export default RightMain;
