import React, { useRef, useState } from "react";
import "./MainBoard.css";
import imgButton from "../../asset/image-regular.svg";
import axios from "axios";
import { useSelector } from "react-redux";

function MainBoard({ addFeed, setFeed, img, text, setImg, setText, setPost }) {
  const [originImg, setOriginImg] = useState();
  const textarea = useRef();
  const imgbutton = useRef();
  const sendButton = useRef();
  const imgAlert = useRef();

  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const userId = useSelector((store) => {
    return store.loginState.userId;
  });
  const email = useSelector((store) => {
    return store.loginState.email;
  });
  const uimg = useSelector((store) => {
    return store.loginState.uimg;
  });

  const onSubmit = (event) => {
    const data = {
      text: text,
      img: img,
      comment: [],
    };
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
      // setTexts((current) => [text, ...current]);
      // setImgs((current) => [img, ...current]);
      setPost((current) => [data, ...current]);

      imgbutton.current.value = "";

      //게시글 작성
      axios
        .post(
          "http://13.125.96.165:3000/board/write",
          {
            image: originImg,
            uid: userId,
            content: text,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            console.log("게시글 작성완료");
            const now = new Date().toString();
            addFeed(res.data.bid, res.data.bimg, [], text, now, email, 0, 0, userId, uimg);
          } else if (res.status === 500) {
            alert("서버에서 에러가 발생 하였습니다.");
          } else {
            alert("클라이언트에서 에리거 발생 하였습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
    setOriginImg(e.target.files[0]);
    reader.onloadend = () => {
      setImg(reader.result);
    };
    console.log(reader.result);
  };

  const imgInputClick = () => {
    imgbutton.current.click();
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="main_wrap">
        <span ref={imgAlert} className="main_img_alert">
          사진을 첨부해주세요.
        </span>
        <div>
          <textarea
            style={{ backgroundColor: "white" }}
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
    </div>
  );
}
export default MainBoard;
