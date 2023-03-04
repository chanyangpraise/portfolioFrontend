import React, { useRef, useState } from "react";
import SideProfile from "../Side/SideProfile";
import "./MainPost.css";
import MainComment from "./MainComment";
import MainLike from "./MainLike";

function MainFeed({ v, i, setCmtModal, setCommentIndex, setEditing, uid, content, date, img, bid }) {
  const Post = useRef();
  const Comment = useRef();
  const [like, setLike] = useState(true);

  function removeView() {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      console.log("삭제완료");
    }
  }

  const toggleLike = () => {
    setLike(!like);
  };

  return (
    <div ref={Post} className="main_post_in_wrap" bid={bid} key={uid}>
      <div className="main_post_profile">
        <div>
          <SideProfile />
        </div>
        <div>
          <button className="main_follow_button">Follow</button>
        </div>
      </div>
      <div className="main_post_imgText">
        <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>{content}</pre>
        <span>{date}</span>
        <img className="main_post_img" src={img} alt="#"></img>
      </div>
      <div className="main_post_bottom">
        <MainLike like={like} toggleLike={toggleLike} />
        <div className="main_post_bottom_menu">
          <span
            onClick={() => {
              setCmtModal(true);
              setCommentIndex(bid);
            }}
          >
            댓글
          </span>
          <span onClick={() => setEditing(true)}>수정</span>
          <span onClick={() => removeView()}>삭제</span>
        </div>
      </div>
      {/* {v.content.map((v, i) => (
        <MainComment ref={Comment} v={v} id={i} />
      ))} */}
    </div>
  );
}

export default MainFeed;
