import React, { useRef, useState } from "react";
import "./RightMain.css";
import MainCommentModal from "../Components/Main/MainCommentModal";
import MainHeader from "../Components/Main/MainHeader";
import MainBoard from "../Components/Main/MainBoard";
import MainPost from "../Components/Main/MainPost";

function RightMain() {
  const imgAlert = useRef();
  const [text, setText] = useState();
  const [texts, setTexts] = useState([]);
  const [img, setImg] = useState();
  const [imgs, setImgs] = useState([]);

  // 댓글 코드
  const [cmtModal, setCmtModal] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentTextArea = useRef();

  const cmtTextAdd = (e) => {
    setComment(e.target.value);
    // textarea ResizeHeight //
    commentTextArea.current.style.height = "auto"; //height 초기화
    commentTextArea.current.style.height = commentTextArea.current.scrollHeight + "px";
  };

  const cmtSubmit = (e) => {
    e.preventDefault();
    setComment("");
    // Submit 했을때 textarea height 초기화
    commentTextArea.current.style.height = "auto";
    // textarea의 값이 빈 값일때 Submit 안되게
    if (comment === "") {
      return;
    }
    // 배열에 담기
    setComments((current) => [comment, ...current]);
    setCmtModal(false);
  };

  return (
    <>
      <MainHeader />
      <MainBoard
        imgAlert={imgAlert}
        text={text}
        img={img}
        setText={setText}
        setImg={setImg}
        setTexts={setTexts}
        setImgs={setImgs}
      />
      <div className="main_post_out_wrap">
        {texts.map((v, i) => (
          <MainPost imgs={imgs} v={v} i={i} setCmtModal={setCmtModal} />
        ))}
        {comments.map((v) => (
          <div style={{ borderTop: "1px solid rgb(194, 194, 194)" }}>
            <SideProfile />
            <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line", marginBottom: "2rem" }}>{v}</pre>
          </div>
        ))}
      </div>
      {cmtModal && (
        <MainCommentModal comment={comment} ref={commentTextArea} cmtTextAdd={cmtTextAdd} cmtSubmit={cmtSubmit} />
      )}
    </>
  );
}

export default RightMain;
