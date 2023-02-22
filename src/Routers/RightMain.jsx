import React, { Fragment, useRef, useState } from "react";
import "./RightMain.css";
import imgButton from "../asset/image-regular.svg";
import SideProfile from "../Components/SideProfile";

function RightMain() {
  const textarea = useRef();
  const imgbutton = useRef();
  const [text, setText] = useState();
  const [texts, setTexts] = useState([]);
  const [img, setImg] = useState();
  const [imgs, setImgs] = useState([]);

  const TextAdd = (event) => {
    setText(event.target.value);

    // textarea ResizeHeight //
    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  // submit //
  const onSubmit = (event) => {
    // onSubmit 새로고침 안되게
    event.preventDefault();
    setText("");
    setImg("");
    // Submit 했을때 textarea height 초기화
    textarea.current.style.height = "auto";
    // textarea의 값이 빈 값일때 Submit 안되게
    if (text === "") {
      return;
    }
    // 배열에 담기
    //
    //
    //
    setTexts((current) => [text, ...current]);
    console.log(texts);
    setImgs((current) => [imgs, ...current]);
  };

  // img add //
  const ImgAdd = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setImg(reader.result);
    };
    console.log(e.target.files[0]);
  };

  return (
    <>
      <div className="main_header">
        <h1>Home</h1>
      </div>
      <form onSubmit={onSubmit} className="main_wrap">
        <div>
          <textarea
            onChange={TextAdd}
            ref={textarea}
            className="main_input"
            type="text"
            placeholder="무슨 일 이야?"
            rows={1}
            value={text}
          />
          <img src={img} onerror="this.style.display='none'" className="main_input_img" />
        </div>
        <div className="main_bottom_box">
          <input
            src={imgButton}
            type="file"
            alt="imgButton"
            className="main_img_button"
            accept="image/*"
            ref={imgbutton}
            onChange={ImgAdd}
          />
          <button className="main_send_button">Send</button>
        </div>
      </form>
      <ul className="main_post_wrap">
        {texts.map((v) => (
          <Fragment key={v}>
            <SideProfile />
            <li style={{ wordBreak: "break-word" }}>
              {v}
              {imgs.map((v) => {
                {
                  v;
                }
              })}
            </li>
          </Fragment>
        ))}
      </ul>
    </>
  );
}

export default RightMain;
