import React, { useRef, useState } from "react";
import "./RightMain.css";
import MainCommentModal from "../Components/Main/MainCommentModal";
import MainHeader from "../Components/Main/MainHeader";
import MainBoard from "../Components/Main/MainBoard";
import MainPost from "../Components/Main/MainPost";
// import SideProfile from "../Components/Side/SideProfile";

function RightMain() {
  // MainBoard,MainPost
  const [text, setText] = useState();
  const [texts, setTexts] = useState([]);
  const [img, setImg] = useState();
  const [imgs, setImgs] = useState([]);

  // MainComment,MainCommentModal
  const [cmtModal, setCmtModal] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  return (
    <>
      <MainHeader />
      <MainBoard text={text} img={img} setText={setText} setImg={setImg} setTexts={setTexts} setImgs={setImgs} />
      <div className="main_post_out_wrap">
        {texts.map((v, i) => (
          <MainPost imgs={imgs} v={v} i={i} setCmtModal={setCmtModal} comments={comments} />
        ))}
      </div>
      {cmtModal && (
        <MainCommentModal
          setComment={setComment}
          setComments={setComments}
          comment={comment}
          setCmtModal={setCmtModal}
        />
      )}
    </>
  );
}

export default RightMain;
