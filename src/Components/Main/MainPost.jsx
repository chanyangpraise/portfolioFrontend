import React, { useRef } from "react";
import SideProfile from "../Side/SideProfile";
import "./MainPost.css";
import HeartImg from "../../asset/heart-regular.svg";
import MainComment from "./MainComment";

function MainPost({ v, i, imgs, setCmtModal, comments }) {
  const Post = useRef();
  const Comment = useRef();
  console.log(Post);

  function removeView() {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      console.log("삭제완료");
    }
  }
  return (
    <div ref={Post} className="main_post_in_wrap" id={i} key={(i += 1)}>
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
          <span onClick={() => setCmtModal(true)}>댓글</span>
          <span>수정</span>
          <span onClick={() => removeView()}>삭제</span>
        </div>
      </div>
      {comments.map((v, i) => (Post.id === Comment.id ? <MainComment ref={Comment} v={v} id={i} /> : null))}
    </div>
  );
}

export default MainPost;
