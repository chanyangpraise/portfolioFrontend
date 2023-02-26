import React, { useRef } from "react";
import SideProfile from "../Side/SideProfile";
import "./MainPostEdit.css";
import MainComment from "./MainComment";

function MainPostEdit({ comments }) {
  const Post = useRef();
  const Comment = useRef();

  return (
    <div className="main_post_edit_wrap" ref={Post}>
      <div className="main_post_edit_inbox">
        <SideProfile />
        <div>
          <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}></pre>
          <img alt="#"></img>
        </div>
        <div>
          <div>
            <span>수정완료</span>
          </div>
        </div>
      </div>
      {comments.map((v, i) => (Post.id === Comment.id ? <MainComment ref={Comment} v={v} id={i} /> : null))}
    </div>
  );
}

export default MainPostEdit;
