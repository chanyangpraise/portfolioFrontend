import React, { Fragment, useRef, useState } from "react";
import "./RightMain.css";
import imgButton from "../asset/image-regular.svg";
import SideProfile from "../Components/SideProfile";

function RightMain() {
  const textarea = useRef();
  const [text, setText] = useState();
  const [texts, setTexts] = useState([]);

  const TextAdd = (event) => {
    console.log(event.target.value);
    setText(event.target.value);

    // textarea ResizeHeight
    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  const onSubmit = (event) => {
    // onSubmit 새로고침 안되게
    event.preventDefault();
    setText("");
    // Submit 했을때 textarea height 초기화
    textarea.current.style.height = "auto";
    // textarea의 값이 빈 값일때 Submit 안되게
    if (text === "") {
      return;
    }

    //
    setTexts((current) => [text, ...current]);
    console.log(texts);
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
        </div>
        <div className="main_bottom_box">
          <img src={imgButton} alt="imgButton" className="main_img_button" />
          <button className="main_send_button">Send</button>
        </div>
      </form>
      <ul>
        {texts.map((v) => (
          <Fragment key={v}>
            <SideProfile />
            <li>{v}</li>
          </Fragment>
        ))}
      </ul>
    </>
  );
}

export default RightMain;
