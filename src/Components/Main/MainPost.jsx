import React from "react";
import SideProfile from "../Side/SideProfile";
import "./MainPost.css";
import HeartImg from "../../asset/heart-regular.svg";

function MainPost({ v, i, imgs, setCmtModal }) {
  return (
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
          <span onClick={() => setCmtModal(true)}>댓글</span>
          <span>수정</span>
          <span>삭제</span>
        </div>
      </div>
    </div>
  );
}

export default MainPost;
